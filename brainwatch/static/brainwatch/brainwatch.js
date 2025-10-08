//add error catching 
window.addEventListener("error", function(e)
{
    console.log("Global error:", e.message);
    console.log("error from file:", e.filename);
    console.log("error line:", e.lineno);
})

let second;
let minute;
let display;
let id;
let timePause;
let resetFlag;
let org_sec;
let org_min;
let org_break_sec;
let org_break_min;
let pomo_break_sec;
let pomo_break_min; 
let createOption;
let count;
let total_seconds;
let total_org_seconds;
let theme;
let theme_switch;
let pomoStudyRunning;
let pomoBreakRunning;
let dropdownButton;
let timeDisplay;
let startButton;
let countdownClock;
let input_sec;
let input_min;
let buttonContainer;
let pauseButton;
let stopButton;
let resetButton;
let clockMode;
let pomoClock;
let pomoStudyMin;
let pomoStudySec;
let pomoBreakMin;
let pomoBreakSec;
let repeat;
let dropdownRepeat;
let moonIcon;
let sunIcon;
let modeButton;
let body;
let clock;
let time_start;
let timePause_start;
let timePause_end;
let breakTimer_start;
let breakTimerPause_start;
let breakTimerPause_end;
let totalPausedTime = 0;
let totalPausedBreakTime = 0;
let isStop;



document.addEventListener("DOMContentLoaded", function(){

    dropdownButton = document.querySelector(".dropdown_option");
    timeDisplay = document.querySelector(".time");
    startButton = document.getElementById("start_button");
    countdownClock = document.querySelector(".countdown_timer");
    input_sec = document.querySelector(".countdown_sec");
    input_min = document.querySelector(".countdown_min"); 
    buttonContainer = document.querySelector(".button_container");
    pauseButton = document.getElementById("pause_button"); 
    stopButton = document.getElementById("stop_button");
    resetButton = document.getElementById("reset_button");
    clockMode = document.querySelector(".title");
    pomoClock = document.querySelector(".pomodoro");
    pomoStudyMin = document.querySelector(".pomo_study_min");
    pomoStudySec = document.querySelector(".pomo_study_sec");
    pomoBreakMin = document.querySelector(".pomo_break_min");
    pomoBreakSec = document.querySelector(".pomo_break_sec"); 
    repeat = document.getElementById("repeat_qty"); 
    dropdownRepeat = document.querySelector(".dropdown_repeat");
    moonIcon = document.querySelector(".moon_icon");
    sunIcon = document.querySelector(".sun_icon");
    modeButton = document.querySelector(".bodytheme_toggle");
    body = document.body;
    clock = document.querySelector(".clock");


    //get theme from localstorage 
    theme = localStorage.getItem("theme");
    console.log(theme);

    if (theme === "light" || theme === null)
    {
        
        body.classList.remove("darkmode");
        theme_switch = "light";
        moonIcon.style.display = "none";
        sunIcon.style.display = "";
    }

    else
    {
        body.classList.toggle("darkmode");
        theme_switch = "dark";
        sunIcon.style.display = "none";
        moonIcon.style.display = "";
    }

    modeButton.onclick = () => {
        if (theme_switch === "dark")
        {
            body.classList.remove("darkmode");
            theme_switch = "light";
            localStorage.setItem("theme", theme_switch);
            console.log(localStorage.getItem("theme"));
            moonIcon.style.display = "none";
            sunIcon.style.display ="";
        }

        else
        {
            body.classList.toggle("darkmode");
            theme_switch = "dark";
            localStorage.setItem("theme", theme_switch);
            console.log(localStorage.getItem("theme"));
            sunIcon.style.display = "none";
            moonIcon.style.display = "";
        }
    }

    if (clock)
    {
        //display default time box, start button and light mode, hide every other elements 
        timeDisplay.style.display = "";
        startButton.style.display = "none";
        countdownClock.style.display = "none";
        pomoClock.style.display = "none"; 
        buttonContainer.style.display = "none";
        dropdownRepeat.style.display = "none";


        dropdownButton.onchange = () => {
            //if user select timer, load timer and its function
        if (dropdownButton.value === "timer")
        {
            //change clock name 
            if (clockMode.textContent !== "Timer")
            {
                clockMode.textContent = "Timer";
            }

            //if not already visible, display and hide other time boxes 
            if (timeDisplay.style.display === "none")
            {
                timeDisplay.style.display = "";
                countdownClock.style.display = "none";
                pomoClock.style.display = "none"; 
            }

            //if not already visible, display start button
            if ( startButton.style.display === "none")
            {
                startButton.style.display = "";
            }

            //if repeat dropdown option is visible, hide it
            if (dropdownRepeat.style.display === "")
            {
                dropdownRepeat.style.display = "none";
            }

            //clear out the timer when user switches from one mode to another and display start button
            clearInterval(id);
            second = 0;
            minute = 0;

            display = `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
            timeDisplay.textContent = display;
            
            if (startButton.style.display === "none")
            {
                startButton.style.display = "";
                buttonContainer.style.display = "none";
            }

            //set isStop = false as default 
            isStop = false;

            //reset all break accumulators 
            totalPausedTime = 0;
            totalPausedBreakTime = 0;

            //when user clicks the start button, hide it and display pause/stop/reset button 
            startButton.onclick = () => {
                startButton.style.display = "none";
                buttonContainer.style.display = "";
                            
                setTimer();
                
                //set flag as false as default 
                timePause = false;
                pauseButton.onclick = () => {
                    pause();
                }
                    
                //click stop button will stop the timer and reset everything back to 0
                stopButton.onclick = () => {
                    stop();
                }
                    
                //set flag as false as default
                resetFlag = false; 
                    
                resetButton.onclick = () => {
                    reset();            
                }
            };
        }
    
        //if user selects countdown, allow user to input their own time to count down from
        else if (dropdownButton.value === "count_down")
        {            
            //change the clock name 
            if (clockMode.textContent !== "Count down")
            {
                clockMode.textContent = "Count down";
            }
           
            //only display if its not already visible 
            if (countdownClock.style.display === "none")
            {   //show countdown time box and hide other time boxes 
                countdownClock.style.display = "";
                timeDisplay.style.display = "none";
                pomoClock.style.display = "none"; 
            }

            //if repeat dropdown option is visible, hide it
            if (dropdownRepeat.style.display === "")
            {
                dropdownRepeat.style.display = "none";
            }

            //only display start button as a default 
            if (startButton.style.display === "none")
            {
                startButton.style.display = "";
                buttonContainer.style.display = "none";
            }

            //clear out the timer when user switches from one mode to another 
            clearInterval(id);
            second = 0; 
            minute = 0;

            input_sec.value = `${String(second).padStart(2, '0')}`;
            input_min.value = `${String(minute).padStart(2, '0')}`;

            //set isStop = false as default 
            isStop = false;  

            //reset all break accumulators 
            totalPausedTime = 0;
            totalPausedBreakTime = 0;
                        
            //when user click start, hide start button and display other buttons. Start counting down from the given time
            startButton.onclick = () => {

                startButton.style.display = "none";
                buttonContainer.style.display = "";

                //assign user's inputs (second + minute) to variables second and minute
                second = parseInt(input_sec.value);
                minute = parseInt(input_min.value); 

                //save original inputs for reset function
                org_sec = second;
                org_min = minute;

                //check for valid inputs 
                if (second === 0 && minute === 0)
                {
                    alert("Oops-no time set.Please add one!");
                    buttonContainer.style.display = "none";
                    startButton.style.display = ""; 
                    input_sec.value = `${String(0).padStart(2, '0')}`;
                    input_min.value = `${String(0).padStart(2, '0')}`;
                    return; 
                }

                if (second > 59 || minute > 99)
                {
                    alert("Enter a valid study time!");
                    buttonContainer.style.display = "none";
                    startButton.style.display = ""; 
                    input_sec.value = `${String(0).padStart(2, '0')}`;
                    input_min.value = `${String(0).padStart(2, '0')}`;
                    return;
                }

                //unable edit to input area 
                input_sec.disabled = true; 
                input_min.disabled = true;

                setCountdown(); 
                
                //set flag as fault as default 
                timePause = false;
                pauseButton.onclick = () => {
                pause();}
       
                stopButton.onclick = () => {
                stop();}

                //set flag as false as default
                resetFlag = false; 

                resetButton.onclick = () =>{
                    reset();}
            }
        }

        else 
        {
            //change clock name 
            if (clockMode.textContent !== "Pomodoro")
            {
                clockMode.textContent = "Pomodoro";
            }

            //only display clock if not already visible 
            if (pomoClock.style.display === "none")
            {
                pomoClock.style.display = "";
                timeDisplay.style.display = "none";
                countdownClock.style.display = "none";
            }

            //display start button if not already visible 
            if (startButton.style.display === "none")
            {
                startButton.style.display = "";
                buttonContainer.style.display = "none";
            }

            //display repeat dropdown if not already visible 
            if (dropdownRepeat.style.display === "none")
            {
                dropdownRepeat.style.display = "";
            }

            //display repeat option from 1 to 10 
            for (let i = 0; i < 10; i++)
            {
                createOption = document.createElement("option"); 
                createOption.value = i + 1; 
                createOption.textContent = i + 1;
                repeat.append(createOption);
            }

            //clear out timer when user switches to different clocks 
            clearInterval(id);
            second = 0;
            minute = 0;
            pomo_break_sec = 0;
            pomo_break_min = 0;

            pomoStudyMin.value = `${String(minute).padStart(2, '0')}`;
            pomoStudySec.value = `${String(second).padStart(2, '0')}`;
            pomoBreakMin.value = `${String(pomo_break_min).padStart(2, '0')}`;
            pomoBreakSec.value = `${String(pomo_break_sec).padStart(2, '0')}`;

            //set isStop = false as default 
            isStop = false;

            //reset all break accumulators 
            totalPausedTime = 0;
            totalPausedBreakTime = 0;

            startButton.onclick = () => {
                //save org inputs for reset function 
                org_min = parseInt(pomoStudyMin.value); 
                org_sec = parseInt(pomoStudySec.value); 
                org_break_min = parseInt(pomoBreakMin.value);
                org_break_sec = parseInt(pomoBreakSec.value); 

                //check if inputs are valid 
                if (org_min === 0 && org_sec === 0 || org_break_min === 0 && org_break_sec === 0)
                {
                    alert("Oops-please set your study/break time");
                    buttonContainer.style.display = "none";
                    startButton.style.display = ""; 
                    pomoStudyMin.value = `${String(0).padStart(2, '0')}`;
                    pomoStudySec.value = `${String(0).padStart(2, '0')}`;
                    pomoBreakMin.value = `${String(0).padStart(2, '0')}`;
                    pomoBreakSec.value = `${String(0).padStart(2, '0')}`;
                    return; 
                }

                if (org_min > 99 || org_sec > 59 || org_break_min > 99 || org_break_sec > 59)
                {
                    alert("Enter a valid study/break time!");
                    buttonContainer.style.display = "none";
                    startButton.style.display = ""; 
                    pomoStudyMin.value = `${String(0).padStart(2, '0')}`;
                    pomoStudySec.value = `${String(0).padStart(2, '0')}`;
                    pomoBreakMin.value = `${String(0).padStart(2, '0')}`;
                    pomoBreakSec.value = `${String(0).padStart(2, '0')}`;
                    return; 
                }

                if (repeat.value === "")
                {
                    alert("Whoops-pick how many cycles!");
                    return;
                }

                //pass user's inputs to variables used for pomo function
                second = org_sec;
                minute = org_min;
                pomo_break_sec = org_break_sec;
                pomo_break_min = org_break_min;   

                //hide start buttons and display other buttons 
                if (buttonContainer.style.display === "none")
                {
                    buttonContainer.style.display = "";
                    startButton.style.display = "none";
                }

                //disable inputs 
                pomoStudyMin.disabled = true;
                pomoStudySec.disabled = true;
                pomoBreakMin.disabled = true;
                pomoBreakSec.disabled = true;

                pomo();

                //set flag as fault as default 
                timePause = false;

                pauseButton.onclick = () => {
                pause();}

                stopButton.onclick = () => {
                    stop();}
    
                //set flag as false as default
                resetFlag = false; 
    
                resetButton.onclick = () =>{
                    reset();}
            }
        }
    }

    //create function for timer 
    function setTimer (){
        
        //set start time only at the beginning 
        if (!timePause_start)
        {
            time_start = Date.now();
        }

        id = setInterval(() => {
            second += 1;
            if (second === 60)
            {
                second = 0;
                minute += 1;
            }
            display = `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
            timeDisplay.textContent = display; 
        },1000)
    }

    //create countdown timer 
    function setCountdown(){
                    
            //set start time only at the beginning 
            if (!timePause_start)
            {
                time_start = Date.now(); 
            }
 
        id = setInterval(() => {      
            if (second === 0)
                {
                    minute -= 1; 
                    second = 60;
                }
                
                second -= 1;

                input_sec.value = `${String(second).padStart(2, '0')}`;
                input_min.value = `${String(minute).padStart(2, '0')}`;

                //once count down ends stop function from running
                if (second === 0 && minute === 0)
                { 
                    alert("Focus block finished");
                    clearInterval(id);
                    second = 0;
                    minute = 0;
                    startButton.style.display = "";
                    buttonContainer.style.display = "none";

                    //enable inputs 
                    input_min.disabled = false;
                    input_sec.disabled = false;

                    //calculate total secs studied 
                    total_seconds = (org_min *60 ) + org_sec;

                    //fetch result to url
                    fetch("/time_calculate", {
                        method: "POST", 
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify({elapsed_time: total_seconds, 
                                              type: "countdown",
                        })
                    })
                    .then(response => {
                        if(response.redirected)
                            return null;
                        return response.json();
                    })
                    .then (data => console.log(data.message, data.id));
                            }
                    }, 1000)
    }

    //create function for pomodoro 
    function pomo(){
        //pass the repeat time to a variable 
        count = parseInt(repeat.value);
        
        //create a function for study
        function startStudy()
        {
            //set start time only at the beginning 
            if (!timePause_start)
            {
                time_start = Date.now();
            }

            //set pomoBreakRunning = false and pomoStudyRunning = true when study timer is running
            pomoStudyRunning = true;
            pomoBreakRunning = false;
            
            if (count === 0)
            {
                alert("Pomodoro cycle finished!");

                //stop interval 
                clearInterval(id);

                //display start button and hide other buttons 
                buttonContainer.style.display = "none";
                startButton.style.display = ""; 

                //enable inputs 
                pomoStudyMin.disabled = false;
                pomoStudySec.disabled = false;
                pomoBreakMin.disabled = false;
                pomoBreakSec.disabled = false;

                //calculate results after the timer is finished 
                total_seconds = (org_min * 60) + org_sec;

                //fetch result to url 
                fetch("/time_calculate", {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({elapsed_time : total_seconds, 
                                          type: "pomodoro"
                    })
                })
                .then(response => {
                    if(response.redirected)
                        return null;
                    return response.json();
                })
                .then(data => console.log(data.message, data.id));
                return;
            }

            id = setInterval(() => {
                if (second === 0)
                {
                    minute -= 1;
                    second = 60; 
                }
                second -= 1; 

                pomoStudyMin.value = `${String(minute).padStart(2, '0')}`;
                pomoStudySec.value = `${String(second).padStart(2, '0')}`;

                //if study time is finished 
                if(second === 0 && minute === 0)
                {
                    //clear clock
                    clearInterval(id);
                    second = org_sec;
                    minute = org_min;

                    //display org input times 
                    pomoStudyMin.value = `${String(minute).padStart(2, '0')}`;
                    pomoStudySec.value = `${String(second).padStart(2, '0')}`;

                    //call breakTime 
                    startBreak(); 
                }

            }, 1000) 
        }

        function startBreak()
        {
            
            //set pomoBreakRunning = true and pomoStudyRunning = false when break timer is running
            pomoBreakRunning = true;
            pomoStudyRunning = false;
            
            //set break start time only at the beginning 
            if (!breakTimerPause_start)
            {
                breakTimer_start = Date.now();
            }
           
            //start break interval
            id = setInterval(() => {
                if (pomo_break_sec === 0 && pomo_break_min !== 0)
                {
                    pomo_break_min -= 1;
                    pomo_break_sec = 60;
                }

                pomo_break_sec -= 1;

                pomoBreakMin.value = `${String(pomo_break_min).padStart(2, '0')}`;
                pomoBreakSec.value = `${String(pomo_break_sec).padStart(2, '0')}`;

                //if break is finished 
                if(pomo_break_sec === 0 && pomo_break_min === 0)
                {
                    //clear break interval
                    clearInterval(id);
                    pomo_break_min = org_break_min;
                    pomo_break_sec = org_break_sec;
    
                    //display org break time
                    pomoBreakMin.value = `${String(org_break_min).padStart(2, '0')}`;
                    pomoBreakSec.value = `${String(org_break_sec).padStart(2, '0')}`;

                    //check if there are still remaining repeats. If yes, -1 to count. 
                    if (count > 0)
                    {
                        count -= 1;

                        //start a new study round
                        startStudy();
                    }

                    else 
                    { 
                        startStudy();
                    }
                }
            }, 1000)
        }
        startStudy();
    }

    //create function for pause button
    function pause(){
        //check if timer is paused 
        if (timePause === false)
        {
            //switch pause button to display play button 
            pauseButton.textContent = "▶";
                    
            //clear interval 
            clearInterval(id);

            //reset timePause each time 
            timePause_start = null;
            timePause_end = null;
                                    
            //display the paused time according to different modes 
            if (timeDisplay.style.display === "")
            {
                //set the start of paused time 
                timePause_start = Date.now();
                timeDisplay.textContent = display;
            }
            
            else if (countdownClock.style.display === "")
            {
                //set the start of paused time 
                timePause_start = Date.now();
                input_sec.value = `${String(second).padStart(2, '0')}`;
                input_min.value = `${String(minute).padStart(2, '0')}`;
            }

            else 
            {
                if (pomoStudyRunning === true)
                {
                    //set the start of paused time 
                    timePause_start = Date.now();
                } 

                if (pomoBreakRunning === true)
                {
                    //set the start of paused time for break timer
                    breakTimerPause_start = Date.now();
                }

                pomoStudyMin.value = `${String(minute).padStart(2, '0')}`;
                pomoStudySec.value = `${String(second).padStart(2, '0')}`;
                pomoBreakMin.value = `${String(pomo_break_min).padStart(2, '0')}`;
                pomoBreakSec.value = `${String(pomo_break_sec).padStart(2, '0')}`;
            }
               
            //set flag as true
            timePause = true;
        }
                    
        else 
        {
            //switch back to pause button
            pauseButton.textContent = "‖";

            if (timeDisplay.style.display === "")
            {
                //set the end of paused time 
                timePause_end = Date.now();

                //calculate all paused time 
                totalPausedTime += (timePause_end - timePause_start);

                setTimer();
            }

            else if (countdownClock.style.display === "")
            {
                //set the end of paused time 
                timePause_end = Date.now();

                //calculate all paused time 
                totalPausedTime += (timePause_end - timePause_start);
                
                setCountdown();
            }

            else 
            {
                //if study timer is running, set the end of paused time for study timer 
                if (pomoStudyRunning === true)
                {
                    timePause_end = Date.now();
                    
                    //calculate all paused time 
                    totalPausedTime += (timePause_end - timePause_start);
                }

                //if break timer is running, set the end of paused time for break timer 
                if (pomoBreakRunning === true)
                {
                    breakTimerPause_end = Date.now();

                    //calculate all paused break time for pomodoro break timer
                    totalPausedBreakTime += (breakTimerPause_end - breakTimerPause_start); 
                }
                pomo();
            }
                                        
            //set flag back to false 
            timePause = false;
        }
    };

    //create function for stop button 
    function stop(){
        //stop timer 
        clearInterval(id); 

        //variable to store clock type to send to backend 
        let clock_type;
        
        //set isStop as true 
        isStop = true;

        //reset break accumulators
        totalPausedTime = 0;
        totalPausedBreakTime = 0;

        //display times according to modes 
        if (timeDisplay.style.display === "")
        {
            //calculate elapsed seconds 
            total_seconds = (minute*60) + second;

            //assign type to variable 
            clock_type = "timer";

            //clear out second and minute after calculating for display
            second = 0;
            minute = 0;
            
            display = `${String(minute).padStart(2, '0')}:${String(second).padStart(2,'0')}`;
            timeDisplay.textContent = display;

        }

        else if (countdownClock.style.display === "")
        {
            
            //calculate total seconds 
            total_org_seconds = (org_min*60) + org_sec; 
            console.log(`second: ${second}, minute: ${minute}`);
            total_seconds = total_org_seconds - (minute*60 + second);

            //assign type to variable 
            clock_type = "countdown";

            //clear out second and minute after calculating for display
            second = 0;
            minute = 0;

            input_sec.value = `${String(second).padStart(2, '0')}`;
            input_min.value = `${String(minute).padStart(2, '0')}`;

            //enable inputs 
            input_min.disabled = false;
            input_sec.disabled = false;
        }

        else 
        {
            //caculate total seconds 
            total_org_seconds = (org_min*60 + org_sec)* parseInt(repeat.value);
            total_seconds = total_org_seconds - ((minute*60 + second)*count);

            //assign type to variable 
            clock_type = "pomodoro";

            //clear out time after calculating for display
            second = 0;
            minute = 0;
            pomo_break_min = 0;
            pomo_break_sec = 0;

            pomoStudyMin.value = `${String(minute).padStart(2, '0')}`;
            pomoStudySec.value = `${String(second).padStart(2, '0')}`;
            pomoBreakMin.value = `${String(pomo_break_min).padStart(2, '0')}`;
            pomoBreakSec.value = `${String(pomo_break_sec).padStart(2, '0')}`;

            //enable inputs 
            pomoStudyMin.disabled = false;
            pomoStudySec.disabled = false;
            pomoBreakMin.disabled = false;
            pomoBreakSec.disabled = false;
        }
                                
        //hide all buttons and display start button
        buttonContainer.style.display = "none";
        startButton.style.display = "";

        //fetch data to url 
        fetch("/time_calculate", {
            method: "POST", 
            headers: {"Content-type": "application/json"}, 
            body: JSON.stringify({elapsed_time: total_seconds,
                                  type: clock_type,
            })
        })
        .then(response => { 
            if (response.redirected)
            return null;
            return response.json();})
        .then(data => console.log(data.message, data.id));
    }

    //create function for reset button 
    function reset(){
        if (resetFlag === false)
            {            
                //stop timer and clear out second and minute
                clearInterval(id);
                second = 0;
                minute = 0;

                if (timeDisplay.style.display === "")
                {
                    display = `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
                    timeDisplay.textContent = display;
                }
                
                else if (countdownClock.style.display === "")
                {
                    input_sec.value = `${String(org_sec).padStart(2, '0')}`;
                    input_min.value = `${String(org_min).padStart(2, '0')}`;
                }

                else 
                {
                    pomoStudyMin.value = `${String(org_min).padStart(2, '0')}`;
                    pomoStudySec.value = `${String(org_sec).padStart(2, '0')}`;
                    pomoBreakMin.value = `${String(org_break_min).padStart(2, '0')}`;
                    pomoBreakSec.value = `${String(org_break_sec).padStart(2, '0')}`;
                }

                //set reset as true 
                resetFlag = true;
                console.log("reset flag: ", resetFlag);
            
                //switch reset button as start button
                resetButton.textContent = "▶";
            }
            
            //if reset button is clicked for the second time
        else 
            {
                //reset start time
                time_start = Date.now();
                
                //switch start button as reset button 
                resetButton.textContent = "↺"; 
            
                //start timer again according to different modes 
                if (timeDisplay.style.display === "")
                {
                    setTimer();
                }
                
                else if (countdownClock.style.display === "")
                {
                    second = org_sec;
                    minute = org_min;
                    setCountdown();
                }

                else
                {
                    second = org_sec;
                    minute = org_min;
                    pomo_break_min = org_break_min;
                    pomo_break_sec = org_break_sec;
                    pomo();
                }
            
                //set reset as false 
                resetFlag = false;
                console.log("reset flag: ", resetFlag);
            }
    }
    }
}); 


//create a function to recalculate the clock whenever the tab is not hidden 
document.addEventListener("visibilitychange", function(){
    let time_now = Date.now(), elapsed, status;
    if (!document.hidden)
    { 
        //if isStop = true, only display clock as 00:00 
        if (isStop === true)
        {
            second = 0; minute = 0;
            if(timeDisplay.style.display ==="")
            {
                display = `${String(minute).padStart(2, '0')}:${String(second).padStart(2,'0')}`;
                timeDisplay.textContent = display;
            }

            else if (countdownClock.style.display === "")
            {
                input_sec.value = `${String(second).padStart(2, '0')}`;
                input_min.value = `${String(minute).padStart(2, '0')}`;
            }
            else 
            {
                pomo_break_min = 0, pomo_break_sec = 0;
                pomoStudyMin.value = `${String(minute).padStart(2, '0')}`;
                pomoStudySec.value = `${String(second).padStart(2, '0')}`;
                pomoBreakMin.value = `${String(pomo_break_min).padStart(2, '0')}`;
                pomoBreakSec.value = `${String(pomo_break_sec).padStart(2, '0')}`;
            }
        }

        else 
        {
            if (timeDisplay.style.display === "")
            {
                //if the timer has been paused, calculate the paused time to elapsed time
                if (timePause_start && timePause_end)
                {
                    elapsed = time_now - time_start - totalPausedTime;
                    status = "there's pause start and pause end";
                    console.log(`pause start: ${timePause_start}, pause end: ${timePause_end}`);
                    console.log(status);
                }
                
                //if timer has been paused but not resume yet, just display the time from when the time is paused
                else if ((timePause_start) && (!timePause_end))
                {
    
                    timeDisplay.textContent = display;
                    status = "there's only pause start";
                    console.log(status);
                    return; 
                }
    
                else 
                {
                    elapsed = time_now - time_start;
                    status = "there's no pause start or end";
                    console.log(status);
                }
    
                minute = Math.floor(elapsed / 60000); 
                second = Math.floor((elapsed % 60000) / 1000);
                console.log(`minute: ${minute} and second: ${second}`);
    
                display = `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
                timeDisplay.textContent = display;
                console.log(display);
    
            }
    
            else if (countdownClock.style.display === "")
            {
                //if timer has been paused, calculate the paused time to elapsed time 
                if (timePause_start && timePause_end)
                {
                    elapsed = (time_start + org_sec*1000 + org_min*60000 + totalPausedTime) - time_now;
                }
    
                //if timer has been paused but not resume yet, just display the time from when the time is paused
                else if (timePause_start && !timePause_end)
                {
                    input_sec.value = `${String(second).padStart(2, '0')}`;
                    input_min.value = `${String(minute).padStart(2, '0')}`;
                    return;
                }
    
                else 
                {
                    elapsed = (time_start + org_sec*1000 + org_min*60000) - time_now;
                }
    
                minute = Math.floor(elapsed/60000);
                second = Math.floor((elapsed % 60000) /1000);
    
                input_sec.value = `${String(second).padStart(2, '0')}`;
                input_min.value = `${String(minute).padStart(2, '0')}`;
            }
            else 
            {
                //if pomoStudy is running 
                if (pomoStudyRunning === true)
                {
                    //if timer has been paused, calculate the paused time to elapsed time 
                    if (totalPausedTime)
                    {
                        elapsed =  (time_start + org_sec*1000 + org_min*60000 + (totalPausedTime)) - time_now;
                    }
    
                    else if (timePause_start && !timePause_end)
                    {
                        pomoStudyMin.value = `${String(minute).padStart(2, '0')}`;
                        pomoStudySec.value = `${String(second).padStart(2, '0')}`;
                        return;
                    }
                    
                    else
                    {
                        elapsed = (time_start + org_sec*1000 + org_min*60000) - time_now;
                    }
                    
                    minute = Math.floor(elapsed / 60000);
                    second = Math.floor((elapsed % 60000) /1000);
    
                    pomoStudyMin.value = `${String(minute).padStart(2, '0')}`;
                    pomoStudySec.value = `${String(second).padStart(2, '0')}`;
                    pomoBreakMin.value = `${String(org_break_min).padStart(2, '0')}`;
                    pomoBreakSec.value = `${String(org_break_sec).padStart(2, '0')}`;
                }
    
                //if pomoBreak is running
                if (pomoBreakRunning === true)
                {
    
                    if (totalPausedBreakTime)
                    {
                        elapsed = (breakTimer_start + org_break_sec*1000 + org_break_min*60000 + totalPausedBreakTime) - time_now ;
                    }
    
                    else if (breakTimerPause_start && !breakTimerPause_end)
                    {
                        pomoBreakMin.value = `${String(org_break_min).padStart(2, '0')}`;
                        pomoBreakSec.value = `${String(org_break_sec).padStart(2, '0')}`;
                        return;
                    }
    
                    else 
                    {
                        elapsed = (breakTimer_start + org_break_sec*1000 + org_break_min*60000) - time_now ;
                    }
                    pomo_break_min = Math.floor(elapsed / 60000);
                    pomo_break_sec = Math.floor((elapsed % 60000) /1000);
    
                    pomoStudyMin.value = `${String(org_min).padStart(2, '0')}`;
                    pomoStudySec.value = `${String(org_sec).padStart(2, '0')}`;
                    pomoBreakMin.value = `${String(pomo_break_min).padStart(2, '0')}`;
                    pomoBreakSec.value = `${String(pomo_break_sec).padStart(2, '0')}`;
                }
            }
        }
    }
}); 



