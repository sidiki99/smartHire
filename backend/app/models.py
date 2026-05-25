from django.db import models
from django.contrib.auth.models import User

# User = get_user_model()


class Company(models.Model):
    company_name = models.CharField(max_length=200, unique=True)
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    description = models.TextField()

    def __str__(self):
        return self.company_name
# job model

class Job(models.Model):

    STATUS_CHOICES = (
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
    )

    JOB_TYPE_CHOICES = (
        ('Full Time', 'Full Time'),
        ('Part Time', 'Part Time'),
        ('Remote', 'Remote'),
        ('Internship', 'Internship'),
    )

    id = models.AutoField(primary_key=True)

   
    companyName = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        to_field='company_name',
        db_column='companyName'
    )

    position = models.CharField(max_length=200)

    category = models.ForeignKey(
        "Category",
        on_delete=models.SET_NULL,
        null=True,
        related_name="jobs"
    )

    jobType = models.CharField(
        max_length=50,
        choices=JOB_TYPE_CHOICES
    )

    vacancy = models.IntegerField()

    experience = models.CharField(max_length=100)

    postedDate = models.DateField()

    lastDate = models.DateField()

    salaryFrom = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    salaryTo = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    city = models.CharField(max_length=100)

    state = models.CharField(max_length=100)

    skills = models.JSONField(default=list)

    education = models.CharField(max_length=200)

    description = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Active'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.position
    
# resume model

class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resumes')

    title = models.CharField(max_length=100, default="My Resume")

    file = models.FileField(upload_to='resumes/')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


#application model

class JobApplication(models.Model):

    class Status(models.TextChoices):
        PENDING = "Pending", "Pending"
        ACCEPTED = "Accepted", "Accepted"
        REJECTED = "Rejected", "Rejected"

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="job_applications"
    )

    job = models.ForeignKey(
        "Job",
        on_delete=models.CASCADE,
        related_name="applications"
    )

    resume = models.ForeignKey(
        "Resume",
        on_delete=models.PROTECT,
        related_name="applications"
    )

    cover_letter = models.TextField(blank=True, null=True)

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "job")  # user can't apply twice to same job

    def __str__(self):
        return f"{self.user} -> {self.job} ({self.status})"
    


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
    
    #saveJob model
    
class SavedJob(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="saved_jobs"
    )

    job = models.ForeignKey(
        "Job",
        on_delete=models.CASCADE,
        related_name="saved_by"
    )

    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "job")  # prevent saving same job twice

    def __str__(self):
        return f"{self.user} saved {self.job}"
    
class Student(models.Model):
        name = models.CharField(max_length=100)
        email = models.EmailField()
        course = models.CharField(max_length=100)

        def __str__(self):
            return self.name