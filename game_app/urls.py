from django.urls import path

from . import views

urlpatterns = [
    path("", views.play, name='main'),
    path("htp/", views.htp, name='htp'),
    path("leaderboards/", views.leaderboards, name='leaderboards'),

    path("api", views.ElementPostView.as_view(), name='api'),
    path("save", views.ScorePostView.as_view(), name='score')

]