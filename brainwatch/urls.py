from django.urls import path
from . import views 

urlpatterns = [
    path("", views.index, name="index"), 
    path("login", views.login_view, name="login"), 
    path("register", views.register, name="register"), 
    path("logout", views.logout_view, name="logout"), 
    path("profile/<int:user_id>", views.profile, name="profile"), 
    path("time_calculate", views.time_calculate, name="time_calculate"), 
    path("setgoal/<int:user_id>", views.set_goal, name="setgoal"),
    path("editgoal/<int:user_id>", views.editgoal, name="editgoal"),
    
]