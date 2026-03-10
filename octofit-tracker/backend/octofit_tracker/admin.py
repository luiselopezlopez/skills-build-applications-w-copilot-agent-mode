from django.contrib import admin
from .models import Team, UserProfile, Activity, Leaderboard, Workout

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "email", "team")
    search_fields = ("username", "email")
    list_filter = ("team",)

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "activity_type", "duration_minutes", "distance_km")
    search_fields = ("activity_type", "user__username")
    list_filter = ("activity_type",)

@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ("id", "team", "points")
    search_fields = ("team__name",)
    list_filter = ("team",)

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "title")
    search_fields = ("title", "user__username")
    list_filter = ("user",)
