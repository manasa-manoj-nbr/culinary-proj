# Generated by Django 5.1.2 on 2024-10-17 21:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_alter_users_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=50, unique=True)),
                ('email', models.EmailField(max_length=50, unique=True)),
                ('password', models.CharField(max_length=128)),
            ],
            options={
                'db_table': 'user_profile',
            },
        ),
        migrations.DeleteModel(
            name='Users',
        ),
    ]
