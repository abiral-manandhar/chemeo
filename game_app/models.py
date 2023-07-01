from django.db import models

class Elements(models.Model):
    appearance = models.CharField(max_length=200, default="nothing")
    category = models.CharField(max_length=200)
    atomic_mass = models.CharField(max_length=200)
    random_cat = models.CharField(max_length=200)
    e_con =  models.CharField(max_length=400, default="xxx")
    identity = models.CharField(max_length=200)

class Score(models.Model):
    score = models.CharField(max_length=20)
    username = models.CharField(max_length=50)

