# 🧠 BrainWatch - Intelligent Study Timer & Progress Tracker

> A distraction-free study timer with analytics to help students optimize their focus sessions

🔗 **[Live Demo](https://brainwatch-production.up.railway.app/)** | 📹 **[Video Walkthrough](#)** (optional)

![BrainWatch Screenshot](screenshot.png) <!-- Add a nice screenshot -->

---

## 📌 The Problem

As a student, I struggled to find a study timer that:
- ✅ Tracked actual study time (not just intentions)
- ✅ Worked without annoying ads or paywalls
- ✅ Provided insights into my productivity patterns
- ✅ Supported different focus techniques (Pomodoro, custom timers)

Existing apps either bombarded me with ads or locked essential features behind subscriptions.

---

## 💡 The Solution

BrainWatch is a **full-stack web application** that tracks study sessions and provides data-driven insights to help users understand their productivity patterns.

### Key Features
- **3 Timer Modes**: Pomodoro (25/5), Countdown, and Stopwatch
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

## 🏗️ Architecture

### Database Models
```python
User          # Django authentication
Profile       # Study sessions with timer type tracking
Goal          # Daily study targets
Streak        # Consecutive day completion tracking


🎯 Challenges & Solutions
Challenge 1: Real-time Data Sync Without Page Reloads
Problem: Users would lose timer data if they accidentally refreshed
Solution: Implemented AJAX endpoints for auto-saving sessions every minute
Impact: Zero data loss, improved user experience
Challenge 2: Accurate Streak Calculation Across Timezones
Problem: Streak logic broke for users studying past midnight
Solution: Used Django's timezone-aware queries with proper date boundaries
Impact: Reliable streak tracking regardless of study time
Challenge 3: Performance with Growing Session History
Problem: Profile page slowed down with 100+ sessions
Solution: Added database indexing and optimized queries with .select_related()
Impact: Page load time reduced from 2.3s to 0.4s