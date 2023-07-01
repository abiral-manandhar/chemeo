# Generated by Django 3.2.7 on 2023-06-29 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Elements',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('appearance', models.CharField(default='nothing', max_length=200)),
                ('category', models.CharField(max_length=200)),
                ('atomic_mass', models.CharField(max_length=200)),
                ('random_cat', models.CharField(max_length=200)),
                ('e_con', models.CharField(default='xxx', max_length=400)),
                ('identity', models.CharField(max_length=200)),
            ],
        ),
    ]
