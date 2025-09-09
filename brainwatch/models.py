from django.db import models
from django.contrib.auth.models import AbstractUser 

# Create your models here.
class User(AbstractUser): 
    pass 

class Profile (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="id_profile")
    elapsed_seconds = models.PositiveIntegerField(null= True)
    day = models.DateField(auto_now_add=True, null=True)  
    clock = models.TextField(null=True)

    def __str__(self):
        return f" User: {self.user}, Total study time: {self.elapsed_seconds}, Day: {self.day}, Chart: {self.clock}"
    
class Goal (models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name="profile_id")
    goal = models.IntegerField(null=True)

    def __str__(self):
        return f"User: {self.user}, Goal: {self.goal}"

class Streak(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mainuser_id")
    day = models.DateField(auto_now_add=True, null=True)
    streak = models.BooleanField(default=False)

    def __str__(self):
        return f"User: {self.user}, Day: {self.day}, Streak: {self.streak}"

