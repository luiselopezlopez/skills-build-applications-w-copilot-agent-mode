from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    team = models.ForeignKey(Team, related_name="users", on_delete=models.CASCADE)

    class Meta:
        db_table = "users"

    def __str__(self):
        return self.username


class Activity(models.Model):
    user = models.ForeignKey(UserProfile, related_name="activities", on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=50)
    duration_minutes = models.PositiveIntegerField()
    distance_km = models.FloatField()

    def __str__(self):
        return f"{self.user.username} - {self.activity_type}"


class Leaderboard(models.Model):
    team = models.OneToOneField(Team, related_name="leaderboard", on_delete=models.CASCADE)
    points = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = "leaderboard"

    def __str__(self):
        return f"{self.team.name}: {self.points}"


class Workout(models.Model):
    user = models.ForeignKey(UserProfile, related_name="workouts", on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title
