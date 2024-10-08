# Generated by Django 5.1 on 2024-08-25 09:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Archive',
            fields=[
                ('t', models.AutoField(primary_key=True, serialize=False)),
                ('phone_number', models.CharField(max_length=255)),
                ('name_info', models.CharField(max_length=255)),
                ('bookid', models.CharField(max_length=255)),
                ('app_book_date', models.DateTimeField()),
                ('received_from', models.CharField(max_length=255)),
                ('accused_char', models.CharField(max_length=255)),
                ('app_form', models.CharField(max_length=255)),
                ('app_date', models.DateTimeField()),
                ('period_fromto', models.CharField(max_length=255)),
                ('tech_name', models.CharField(max_length=255)),
                ('app_kind', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Dispatch',
            fields=[
                ('t', models.AutoField(primary_key=True, serialize=False)),
                ('name_accused', models.CharField(max_length=255)),
                ('saved_numbers', models.CharField(max_length=255)),
                ('saved_name', models.CharField(max_length=255)),
                ('saved_info', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='k_temp',
            name='person',
        ),
        migrations.RemoveField(
            model_name='z_temp',
            name='person',
        ),
        migrations.RenameField(
            model_name='person',
            old_name='created_at',
            new_name='created_date',
        ),
        migrations.RemoveField(
            model_name='person',
            name='updated_at',
        ),
        migrations.AlterField(
            model_name='person',
            name='phone_number',
            field=models.CharField(max_length=255),
        ),
        migrations.CreateModel(
            name='ATemp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('e_report', models.CharField(max_length=255)),
                ('caller_number', models.CharField(max_length=255)),
                ('called_number', models.CharField(max_length=255)),
                ('third_party_number', models.CharField(blank=True, max_length=255, null=True)),
                ('call_initial_time', models.DateTimeField()),
                ('conversation_duration', models.IntegerField()),
                ('city', models.CharField(max_length=255)),
                ('site_name', models.CharField(max_length=255)),
                ('charged_mobile_user_imei', models.CharField(max_length=255)),
                ('charged_mobile_user_imsi', models.CharField(max_length=255)),
                ('lon', models.FloatField()),
                ('lat', models.FloatField()),
                ('site_id', models.CharField(max_length=255)),
                ('cgi', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='a_temp', to='app.person')),
            ],
        ),
        migrations.CreateModel(
            name='KTemp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime', models.DateTimeField()),
                ('call_type', models.CharField(max_length=255)),
                ('msisdn', models.CharField(max_length=255)),
                ('imsi', models.CharField(max_length=255)),
                ('b_party_msisdn', models.CharField(max_length=255)),
                ('duration', models.IntegerField()),
                ('calling_number', models.CharField(max_length=255)),
                ('called_number', models.CharField(max_length=255)),
                ('imei', models.CharField(max_length=255)),
                ('call_location', models.CharField(max_length=255)),
                ('site_id', models.CharField(max_length=255)),
                ('site', models.CharField(max_length=255)),
                ('governorate', models.CharField(max_length=255)),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='k_temp', to='app.person')),
            ],
        ),
        migrations.CreateModel(
            name='Media',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_path', models.CharField(max_length=255)),
                ('file_type', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='media', to='app.person')),
            ],
        ),
        migrations.CreateModel(
            name='ZTemp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('call_type', models.CharField(max_length=255)),
                ('duration', models.IntegerField()),
                ('calling_number', models.CharField(max_length=255)),
                ('called_number', models.CharField(max_length=255)),
                ('call_location', models.CharField(max_length=255)),
                ('site_id', models.CharField(max_length=255)),
                ('split', models.CharField(blank=True, max_length=255, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='z_temp', to='app.person')),
            ],
        ),
        migrations.DeleteModel(
            name='a_temp',
        ),
        migrations.DeleteModel(
            name='k_temp',
        ),
        migrations.DeleteModel(
            name='z_temp',
        ),
    ]
