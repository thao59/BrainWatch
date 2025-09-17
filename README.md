Distinctiveness and Complexity:
BrainWatch is a website that I created to track my study progress. I realised that tracking time studied is the only way to know how long I have actually studied each day. I have tried using different study apps; however, the majority of them include unwanted ads or require payment to unlock additional functions. This was the reason why I decided to make this website.
There are three different timer modes (Pomodoro, countdown, and a basic timer). The website also allows users to create their own accounts, which enables them to set study goals, track their progress, and see which timer modes they use most frequently (most effective for their studies).
I utilised Django models to store users' data. From this data, I can gather users' information using complex database queries with date filtering and aggregation functions, and time-based calculations for up-to-date statistics and streak analysis.
I used JavaScript extensively to manage the functions of three timers, allowing real-time UI state transitions and dynamic mode switching. I incorporated Chart.js to visually display the percentage of each timing mode used by users.
I also implemented dark mode and light mode (I like studying at night in a dark room, so a dark mode website helps my eyes adjust).

File Contents:
models.py contains four Django models - User (authentication), Profile (individual study sessions with timer type tracking), Goal (daily study targets), and Streak (consecutive day completion tracking).
views.py contains eight view functions handling user authentication, complex profile analytics with date calculations, goal management system, and AJAX endpoints for real-time timer data synchronization.
script.js contains core application logic managing different timer modes, UI transitions, theme management, time calculations, and real-time AJAX communication between frontend and backend.

Usage:
The application is straightforward. Any user visiting the page can use the timers. However, users need to create their own profile by clicking the Menu bar in the top left corner. There will be two options: either login (if the user already has an account) or register (for new users). After logging in, users will be navigated back to the main page where the timers are displayed.
To access their profile for statistics, they can click on the same Menu bar in the top left corner, which at this point should only have two options: Logout and Profile. Selecting Profile leads the user to their profile page, where they can set/edit their daily study goal as well as track their weekly studied hours and study streaks. The chart also displays the percentage of weekly usage for each timer mode.
To adjust between dark/light mode, users can click the button in the top right corner. This is especially useful for someone studying late at night who wants to create a comfortable environment for their late-night sessions.

Additional Information:
The website requires the installation of Django and whitenoise and should run perfectly.

Live demo: https://brainwatch-production.up.railway.app/
