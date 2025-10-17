# 🧠 BrainWatch - Intelligent Study Timer & Progress Tracker

> A distraction-free study timer with analytics to help students optimise their focus sessions

Live Demo (https://brainwatch-production.up.railway.app/) 

---

The Problem

As a student, I struggled to find a study timer that:
- ✅ Tracked actual study time (not just intentions)
- ✅ Worked without annoying ads or paywalls
- ✅ Provided insights into my productivity patterns
- ✅ Supported different focus techniques (Pomodoro, custom timers)

Existing apps either bombarded me with ads or locked essential features behind subscriptions.

---
The Solution

BrainWatch is a full-stack web application that tracks study sessions and provides data-driven insights to help users understand their productivity patterns.

### Key Features
- **3 Timer Modes**: Pomodoro, Countdown, and Stopwatch
- **Progress Analytics**: Weekly study hours, streak tracking, mode effectiveness
- **Goal Setting**: Set daily targets and track completion
- **Visual Insights**: Chart.js graphs showing timer usage patterns
- **Dark/Light Mode**: Eye-friendly themes for day/night studying
- **Real-time Sync**: AJAX updates for seamless data persistence

---

## 🛠️ Tech Stack

**Frontend:**
- Vanilla JavaScript (ES6+)
- HTML5/CSS3
- Chart.js for data visualization
- AJAX for real-time updates

**Backend:**
- Django (Python web framework)
- SQLite database
- Django ORM for complex queries
- WhiteNoise for static file serving

**Deployment:**
- Railway (hosting platform)
- Git/GitHub for version control

---

### Database Models
User          # Django authentication
Profile       # Study sessions with timer type tracking
Goal          # Daily study targets
Streak        # Consecutive day completion tracking

