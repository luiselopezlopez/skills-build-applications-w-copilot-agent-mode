from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, Leaderboard, Team, UserProfile, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing app data in dependency order.
        self._delete_queryset(Activity.objects.all())
        self._delete_queryset(Workout.objects.all())
        self._delete_queryset(Leaderboard.objects.all())
        self._delete_queryset(UserProfile.objects.all())
        self._delete_queryset(Team.objects.all())

        team_marvel = Team.objects.create(name='Team Marvel')
        team_dc = Team.objects.create(name='Team DC')

        users = {
            'ironman': UserProfile.objects.create(username='ironman', email='ironman@marvel.com', team=team_marvel),
            'captainamerica': UserProfile.objects.create(
                username='captainamerica', email='captainamerica@marvel.com', team=team_marvel
            ),
            'spiderman': UserProfile.objects.create(username='spiderman', email='spiderman@marvel.com', team=team_marvel),
            'batman': UserProfile.objects.create(username='batman', email='batman@dc.com', team=team_dc),
            'superman': UserProfile.objects.create(username='superman', email='superman@dc.com', team=team_dc),
            'wonderwoman': UserProfile.objects.create(username='wonderwoman', email='wonderwoman@dc.com', team=team_dc),
        }

        Activity.objects.bulk_create(
            [
                Activity(user=users['ironman'], activity_type='run', duration_minutes=30, distance_km=5.0),
                Activity(user=users['captainamerica'], activity_type='cycle', duration_minutes=60, distance_km=20.0),
                Activity(user=users['spiderman'], activity_type='swim', duration_minutes=45, distance_km=2.0),
                Activity(user=users['batman'], activity_type='run', duration_minutes=25, distance_km=4.0),
                Activity(user=users['superman'], activity_type='cycle', duration_minutes=70, distance_km=25.0),
                Activity(user=users['wonderwoman'], activity_type='swim', duration_minutes=50, distance_km=3.0),
            ]
        )

        Workout.objects.bulk_create(
            [
                Workout(user=users['ironman'], title='Arc Reactor HIIT', description='High intensity interval training session.'),
                Workout(
                    user=users['captainamerica'],
                    title='Shield Core Circuit',
                    description='Core and bodyweight circuit for endurance.',
                ),
                Workout(
                    user=users['batman'],
                    title='Gotham Night Strength',
                    description='Strength-focused full body workout.',
                ),
                Workout(
                    user=users['wonderwoman'],
                    title='Amazonian Power',
                    description='Mobility and power training plan.',
                ),
            ]
        )

        Leaderboard.objects.create(team=team_marvel, points=120)
        Leaderboard.objects.create(team=team_dc, points=115)

        self.stdout.write(self.style.SUCCESS('Populate the octofit_db database with test data: success'))

    def _delete_queryset(self, queryset):
        for obj in queryset:
            if obj.pk is None:
                continue
            obj.delete()
