from django.test import TestCase
from .models import Team, UserProfile, Activity, Leaderboard, Workout

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name="Test Team")
        self.assertEqual(team.name, "Test Team")

class UserProfileModelTest(TestCase):
    def test_create_user_profile(self):
        team = Team.objects.create(name="Test Team")
        user = UserProfile.objects.create(username="testuser", email="test@example.com", team=team)
        self.assertEqual(user.username, "testuser")
        self.assertEqual(user.email, "test@example.com")
        self.assertEqual(user.team, team)

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        team = Team.objects.create(name="Test Team")
        user = UserProfile.objects.create(username="testuser", email="test@example.com", team=team)
        activity = Activity.objects.create(user=user, activity_type="run", duration_minutes=30, distance_km=5.0)
        self.assertEqual(activity.activity_type, "run")
        self.assertEqual(activity.duration_minutes, 30)
        self.assertEqual(activity.distance_km, 5.0)
        self.assertEqual(activity.user, user)

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        team = Team.objects.create(name="Test Team")
        leaderboard = Leaderboard.objects.create(team=team, points=100)
        self.assertEqual(leaderboard.team, team)
        self.assertEqual(leaderboard.points, 100)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        team = Team.objects.create(name="Test Team")
        user = UserProfile.objects.create(username="testuser", email="test@example.com", team=team)
        workout = Workout.objects.create(user=user, title="Morning Run", description="A quick run.")
        self.assertEqual(workout.user, user)
        self.assertEqual(workout.title, "Morning Run")
        self.assertEqual(workout.description, "A quick run.")
