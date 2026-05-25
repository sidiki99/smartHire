from django.contrib import admin
from .models import Company, Job, Category, Resume, JobApplication, SavedJob
# Register your models here.

admin.site.register(Company)
admin.site.register(Category)
admin.site.register(Job)
admin.site.register(Resume)
admin.site.register(JobApplication)
admin.site.register(SavedJob)

