import os

from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from rest_framework import routers

from .views import (
    ActivityViewSet,
    LeaderboardViewSet,
    TeamViewSet,
    UserProfileViewSet,
    WorkoutViewSet,
)

codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"

router = routers.DefaultRouter()
router.register(r'teams', TeamViewSet)
router.register(r'users', UserProfileViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'leaderboard', LeaderboardViewSet)
router.register(r'workouts', WorkoutViewSet)


def api_root(request):
    return JsonResponse(
        {
            "teams": f"{base_url}/api/teams/",
            "users": f"{base_url}/api/users/",
            "activities": f"{base_url}/api/activities/",
            "leaderboard": f"{base_url}/api/leaderboard/",
            "workouts": f"{base_url}/api/workouts/",
        }
    )

urlpatterns = [
    path('', api_root, name='root-api'),
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
]
