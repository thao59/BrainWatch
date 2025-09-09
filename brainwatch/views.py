from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib import messages 
from django.contrib.auth import authenticate, login, logout 
from .models import User, Profile, Goal, Streak
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError 
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from django.db.models import Sum
from datetime import date, timedelta

# Create your views here.
def index(request):
    return render(request, "brainwatch/index.html")

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        if not username:
            messages.error(request, "Please provide username")
            return redirect("login")
        
        password = request.POST["password"]
        if not password:
            messages.error(request, "Please provide password")
            return redirect ("login")

        #authenticate user 
        user = authenticate(request, username = username, password=password)

        #if authentication is successful, log user in
        if user is not None:
            login(request, user)
            messages.success(request, f"{username} has logged in!")
            return redirect("index")
        else: 
            messages.error("Login details are incorrect!")
            return redirect("login")
    else:
        return render(request, "brainwatch/login.html")

def register(request):
    if request.method == "POST":
        email = request.POST["email"]
        if not email: 
            messages.error(request, "Please provide your email")
            return redirect ("register")

        username = request.POST["username"]
        if not username:
            messages.error(request, "Please provide username!")
            return redirect ("register")

        password = request.POST["password"]
        if not password: 
            messages.error(request, "Please provide password!")
            return redirect ("register")

        confirmation = request.POST["confirm_password"]
        if not confirmation:
            messages.error(request, "Please confirm your password! ")
            return redirect ("register")

        #confirm if pass and confirmation match
        if password != confirmation:
            messages.error(request, "Passwords do not match!") 
            return redirect ("register")
        
        #create new user 
        try:
            new_user = User.objects.create_user(username, email, password)

            #authenticate user before logging them in 
            auth_user = authenticate(request, username=username, password=password)

            #if authentication is successful, log user in
            if auth_user is not None:
                login(request, auth_user)
                return redirect("index")
        
        except Exception as e:
            print(f"Error: {e}")
            messages.error(request, "Username has been taken")
            return redirect("register")
        
    else:
        return render(request, "brainwatch/register.html")

def logout_view(request): 
    messages.success(request, f"{request.user} has logged out successfully!")
    logout(request)
    return redirect("index")

@login_required(login_url="login")
def profile(request, user_id):

    #get goal from user's db
    try:
        user = Goal.objects.get(user_id = user_id)
        goal = user.goal
    except Goal.DoesNotExist:
        goal = "none"

    weekly_dict = {}

    #calculate total studied time this week 
    #step1: figure out which day of the week 
    today = date.today()
    day_no = today.weekday()

    if day_no != 0:
        monday = today - timedelta(days=day_no)
    else:
        monday = today
    
    #step2: filter the date in database and calculate the total studied time
    row = Profile.objects.filter(user_id = user_id, day__range=[monday, today]).aggregate(weekly_time=Sum("elapsed_seconds"))

    if row["weekly_time"] is not None: 
        weekly_hour = row["weekly_time"]//3600
        weekly_minute = (row["weekly_time"] % 3600) //60 

        new_record = {"weekly_hour": weekly_hour,
                      "weekly_minute": weekly_minute,}
        weekly_dict["stats_weekly"] = new_record 
    else:
        weekly_dict = {}

    daily_dict = {}

    #get user study time from today
    row_today = Profile.objects.filter(user_id=user_id, day=date.today()).aggregate(total_time=Sum("elapsed_seconds"))

    if row_today["total_time"] is not None: 
        #convert studied time to hour and minute 

        total_hour = row_today["total_time"]//3600
        total_minute = (row_today["total_time"] % 3600) //60
        
        if goal != "none":
            percentage = (row_today["total_time"]/(goal*3600))*100
            new_record = {"minute": total_minute, 
                          "hour": total_hour,
                        "percentage": percentage}
            daily_dict["stats_daily"] = new_record

        else:
            new_record = {"minute": total_minute,
                          "hour": total_hour, 
                          }
            daily_dict["stats_daily"] = new_record  

        #create today streak if not already created and mark as True
        try: 
            get_streak = Streak.objects.get(user_id = user_id, day=date.today())

        except Streak.DoesNotExist:
            user_profile = User.objects.get(id = user_id)
            create_streak = Streak.objects.create(user = user_profile, streak = True) 
    else:
        daily_dict = []
    
    #filter out days of the week up to today
    rows = Streak.objects.filter(user_id = user_id, day__range=[monday, today])
    
    #initiate variable to count streak 
    count = 0

    if rows: 
        #loop through each row 
        for row in rows:
            if row.streak:
                count += 1
            else:
                count = 0
    else:
        count = 0

    #sum total studied hours for each type of clock 
    timer = Profile.objects.filter(user=request.user, day__range=[monday,today], clock="timer").aggregate(total_hours = Sum("elapsed_seconds"))
    if timer["total_hours"] is None: 
        timer = 0
    else:
        timer = timer["total_hours"]

    countdown = Profile.objects.filter(user=request.user, day__range=[monday,today], clock="countdown").aggregate(total_hours = Sum("elapsed_seconds"))
    if countdown["total_hours"] is None:
        countdown = 0
    else:
        countdown = countdown["total_hours"]

    pomodoro = Profile.objects.filter(user=request.user, day__range=[monday,today], clock="pomodoro").aggregate(total_hours = Sum("elapsed_seconds"))
    if pomodoro["total_hours"] is None:
        pomodoro = 0
    else: 
        pomodoro = pomodoro["total_hours"]

    return render(request, "brainwatch/profile.html", {
                             "goal": goal, 
                             "daily_dict": daily_dict,
                             "weekly_dict": weekly_dict,
                             "streak": count,
                             "timer": timer, 
                             "countdown": countdown,
                             "pomodoro": pomodoro,
    })


@login_required(login_url="login")
@csrf_exempt 
def time_calculate(request):
    if request.method == "POST":
        data = json.loads(request.body)

        #retrieve data from fetch 
        elapsed_time = data["elapsed_time"]
        clocktype = data["type"]

        #create a new row of data 
        new_row = Profile.objects.create(user = request.user, elapsed_seconds = elapsed_time, clock = clocktype)

        return JsonResponse ({"message":"success", "id": new_row.id})

@login_required(login_url="login")
def set_goal(request,user_id):
    if request.method == "POST":
        new_goal = request.POST["goal"]

        #check for valid input 
        if not new_goal:
            messages.error(request, "Oops-no goal set!")
            return redirect("setgoal", user_id)
        
        #check if user has set goal 
        try: 
            row = Goal.objects.get(user_id = user_id)

            #if row exit, take user to edit page 
            return redirect("editgoal", user_id)
        
        except Goal.DoesNotExist:
            #create new data 
            user = User.objects.get(id = user_id)
            setgoal = Goal.objects.create(user = user, goal = new_goal)

        return redirect("profile", user_id)

    return render(request, "brainwatch/setgoal.html") 

@login_required (login_url="login")
def editgoal(request, user_id):
    if request.method == "POST":
        edit_goal = request.POST["editgoal"]

        #check for valid input 
        if not edit_goal:
            messages.error(request, "Oops-set your new goal!")
            return redirect("editgoal", user_id )

        #query database. If row exists, update goal. If not, redirect them to set goal page
        try:
            row = Goal.objects.get(user_id = user_id)
            row.goal = edit_goal
            row.save()
        except Goal.DoesNotExist:
            print("No goal set")
            redirect("setgoal", user_id)
        
        return redirect("profile", user_id) 
    return render(request, "brainwatch/editgoal.html")
    
    
