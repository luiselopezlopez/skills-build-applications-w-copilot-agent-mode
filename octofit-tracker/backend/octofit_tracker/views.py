from django.http import JsonResponse
from rest_framework import viewsets

from .models import Activity, Leaderboard, Team, UserProfile, Workout
from .serializers import (
    ActivitySerializer,
    LeaderboardSerializer,
    TeamSerializer,
    UserProfileSerializer,
    WorkoutSerializer,
)


def api_root(request):
    return JsonResponse(
        {
            "teams": "/api/teams/",
            "users": "/api/users/",
            "activities": "/api/activities/",
            "leaderboard": "/api/leaderboard/",
            "workouts": "/api/workouts/",
        }
    )


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by("name")
    serializer_class = TeamSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.select_related("team").all().order_by("username")
    serializer_class = UserProfileSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.select_related("user").all().order_by("id")
    serializer_class = ActivitySerializer


class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.select_related("team").all().order_by("-points")
    serializer_class = LeaderboardSerializer


class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.select_related("user").all().order_by("title")
    serializer_class = WorkoutSerializer
