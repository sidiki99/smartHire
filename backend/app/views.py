from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from .models import Job, Category,Student, Company
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt



# @csrf_exempt
# def signup(request):
#     if request.method == "POST":
#         data = json.loads(request.body)

#         user = User.objects.create_user(
#             username=data["username"],
#             password=data["password"]
#         )

#         return JsonResponse({"message": "User created"})
from django.contrib.auth.models import User
from django.http import JsonResponse

@csrf_exempt
def signup(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST allowed"},
            status=400
        )

    try:
        data = json.loads(request.body)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return JsonResponse(
                {"error": "All fields required"},
                status=400
            )

        if User.objects.filter(username=username).exists():
            return JsonResponse(
                {"error": "Username already exists"},
                status=400
            )

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        return JsonResponse({
            "message": "Signup successful",
            "id": user.id
        })

    except Exception as e:
        return JsonResponse({
            "error": str(e)
        }, status=500)
    
@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)

        user = authenticate(
            username=data["username"],
            password=data["password"]
        )

        if user:
            login(request, user)
            return JsonResponse({"message": "Login success"})
        return JsonResponse({"error": "Invalid credentials"}, status=400)


def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logged out"})


# def current_user(request):
#     if request.user.is_authenticated:
        
#         profile = request.user.profile
#         return JsonResponse({
#             "username": request.user.username,
#             "id": request.user.id,
#             "email": request.user.email,
#              "phone": profile.phone,
#              "profile_pic": profile.profile_pic
#         })
#     return JsonResponse({"user": None}, status=401) 
#////////////////////


from django.http import JsonResponse
from .models import Profile, Resume


def current_user(request):

    if request.user.is_authenticated:

        profile, created = Profile.objects.get_or_create(
            user=request.user
        )

        # GET LATEST RESUME
        resume = Resume.objects.filter(
            user=request.user
        ).last()

        return JsonResponse({

            "username": request.user.username,

            "id": request.user.id,

            "email": request.user.email,

            "phone": profile.phone,

            "profile_pic": (
                profile.profile_pic.url
                if profile.profile_pic
                else None
            ),

            # SEND RESUME URL
            "resume": (
                resume.file.url
                if resume
                else None
            )

        })

    return JsonResponse({
        "user": None
    }, status=401)
# HOME PAGE
# =========================

def home(request):
    return render(request, 'app/home.html')


# =========================
# ADD STUDENT
# =========================

@api_view(['POST'])
def add_student(request):

    name = request.data.get('name')
    email = request.data.get('email')
    course = request.data.get('course')

    student = Student.objects.create(
        name=name,
        email=email,
        course=course
    )

    return Response({
        "message": "Student Added Successfully",
        "id": student.id
    })


# =========================
# GET STUDENTS
# =========================

@api_view(['GET'])
def get_students(request):

    students = Student.objects.all()

    data = []

    for student in students:
        data.append({
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "course": student.course
        })

    return Response(data)


# =========================
# ADD COMPANY
# =========================

@csrf_exempt
@require_http_methods(["POST"])
def add_company(request):

    try:

        company_name = request.POST.get("company_name")
        website = request.POST.get("website")
        email = request.POST.get("email")
        phone = request.POST.get("phone")
        address = request.POST.get("address")
        description = request.POST.get("description")
        logo = request.FILES.get("logo")

        if Company.objects.filter(email=email).exists():

            return JsonResponse({
                "error": "Email already exists"
            }, status=400)

        if Company.objects.filter(company_name=company_name).exists():

            return JsonResponse({
                "error": "Company already exists"
            }, status=400)

        company = Company.objects.create(
            company_name=company_name,
            website=website,
            email=email,
            phone=phone,
            address=address,
            description=description,
            logo=logo
        )
        

        return JsonResponse({
            "message": "Company Added Successfully",
            "id": company.id

             
        })

    except Exception as e:

        return JsonResponse({
            "error": str(e)
        }, status=400)


def get_companies(request):
    companies = Company.objects.all().values("id", "company_name")
    return JsonResponse(list(companies), safe=False)   
def get_category(request):
    categories = Category.objects.all().values("id", "name")
    return JsonResponse(list(categories), safe=False)  
def get_job(request):
    jobs = Job.objects.select_related("companyName").all()

    data = [
        {
            "id": job.id,
            "position": job.position,
            "companyName": job.companyName.company_name,  # FIX
            "jobType": job.jobType,
            "vacancy": job.vacancy,
            "experience": job.experience,
            "postedDate": job.postedDate,
            "lastDate": job.lastDate,
            "salaryFrom": job.salaryFrom,
            "salaryTo": job.salaryTo,
            "city": job.city,
            "state": job.state,
            "skills": job.skills,
            "education": job.education,
            "description": job.description,
        }
        for job in jobs
    ]

    return JsonResponse(data, safe=False)

#   for add job function
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

@csrf_exempt
@require_http_methods(["POST"])
def add_job(request):

    try:
        # Get form-data (NOT JSON)
        data = request.POST

        # Foreign keys
        # company = Company.objects.get(company_name=data.get("companyName"))
        company = Company.objects.get(id=data.get("companyName"))
        
        category = Category.objects.get(id=data.get("category"))

        job = Job.objects.create(
            companyName=company,
            position=data.get("position"),
            category=category,
            jobType=data.get("jobType"),
            vacancy=data.get("vacancy"),
            experience=data.get("experience"),
            postedDate=data.get("postedDate"),
            lastDate=data.get("lastDate"),
            salaryFrom=data.get("salaryFrom"),
            salaryTo=data.get("salaryTo"),
            city=data.get("city"),
            state=data.get("state"),
            skills=data.get("skills"),
            education=data.get("education"),
            description=data.get("description"),
            status=data.get("status")
        )

        return JsonResponse({
            "message": "Job created successfully",
            "id": job.id
        })

    except Company.DoesNotExist:
        return JsonResponse({"error": "Company not found"}, status=400)

    except Category.DoesNotExist:
        return JsonResponse({"error": "Category not found"}, status=400)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

        ## get job
from django.http import JsonResponse
from .models import Job

def get_jobs(request):
    jobs = Job.objects.select_related("companyName", "category").all()

    data = []
    for job in jobs:
        data.append({
            "id": job.id,
            "company": job.companyName.company_name,  # adjust field if different
            "position": job.position,
            "category": job.category.name,  # adjust if needed
            "jobType": job.jobType,
            "vacancy": job.vacancy,
            "experience": job.experience,
            "postedDate": job.postedDate,
            "lastDate": job.lastDate,
            "salaryFrom": job.salaryFrom,
            "salaryTo": job.salaryTo,
            "city": job.city,
            "state": job.state,
            "skills": job.skills,
            "education": job.education,
            "description": job.description,
            "status": job.status,
        })

    return JsonResponse(data, safe=False)
      ### apply job
      # views.py
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from .models import (
    Job,
    JobApplication,
    Resume
)


@csrf_exempt
@login_required
def apply_job(request):

    if request.method != "POST":

        return JsonResponse({
            "error": "POST request required"
        }, status=400)

    try:

        job_id = request.POST.get("job_id")

        cover_letter = request.POST.get(
            "cover_letter"
        )

        uploaded_resume = request.FILES.get(
            "resume"
        )

        job = Job.objects.get(id=job_id)

        # CHECK ALREADY APPLIED
        already_applied = JobApplication.objects.filter(
            user=request.user,
            job=job
        ).exists()

        if already_applied:

            return JsonResponse({
                "error": "Already applied"
            }, status=400)

        # GET SAVED RESUME
        latest_resume = Resume.objects.filter(
            user=request.user
        ).last()

        # USER UPLOADED NEW RESUME
        if uploaded_resume:

            latest_resume = Resume.objects.create(
                user=request.user,
                title=f"{request.user.username} Resume",
                file=uploaded_resume
            )

        # NO RESUME FOUND
        if not latest_resume:

            return JsonResponse({
                "error": "Please upload resume first"
            }, status=400)

        # CREATE APPLICATION
        application = JobApplication.objects.create(
            user=request.user,
            job=job,
            resume=latest_resume,
            cover_letter=cover_letter
        )

        return JsonResponse({
            "message": "Application submitted",
            "application_id": application.id
        })

    except Job.DoesNotExist:

        return JsonResponse({
            "error": "Job not found"
        }, status=404)

    except Exception as e:

        return JsonResponse({
            "error": str(e)
        }, status=500)
      ###apply job


# from rest_framework.decorators import api_view, parser_classes
# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.response import Response
# from .models import JobApplication, Resume, Job
# from django.contrib.auth.models import User

# @api_view(["POST"])
# @parser_classes([MultiPartParser, FormParser])
# def apply_job(request):

#     user = request.user  # must be logged in

#     job_id = request.data.get("job")
#     resume_id = request.data.get("resume")
#     cover_letter = request.data.get("cover_letter")

#     job = Job.objects.get(id=job_id)

#     # get selected resume
#     resume = Resume.objects.get(id=resume_id)

#     # create application
#     app = JobApplication.objects.create(
#         user=user,
#         job=job,
#         resume=resume,
#         cover_letter=cover_letter
#     )

#     return Response({
#         "message": "Application submitted successfully",
#         "application_id": app.id
#     })



# @api_view(["POST"])
# @parser_classes([MultiPartParser, FormParser])
# def upload_resume(request):
#     user = request.user

#     file = request.FILES.get("file")
#     title = request.data.get("title")

#     resume = Resume.objects.create(
#         user=user,
#         title=title,
#         file=file
#     )

#     return Response({"id": resume.id, "title": resume.title})

@api_view(["GET"])
def get_resumes(request):
    resumes = Resume.objects.filter(user=request.user)

    return Response([
        {
            "id": r.id,
            "title": r.title
        } for r in resumes
    ])


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Profile,Resume

# GET profile
def get_profile(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Not logged in"}, status=401)

    profile = request.user.profile

    return JsonResponse({
        "phone": profile.phone,
        "city": profile.city,
        "state": profile.state,
        "education": profile.education,
        "experience": profile.experience,
        "skills": profile.skills,
    })


# # UPDATE profile
# @csrf_exempt
# def update_profile(request):
#     if request.method == "POST":
#         if not request.user.is_authenticated:
#             return JsonResponse({"error": "Not logged in"}, status=401)

#         data = json.loads(request.body)
#         profile = request.user.profile

#         profile.phone = data.get("phone", "")
#         profile.city = data.get("city", "")
#         profile.state = data.get("state", "")
#         profile.education = data.get("education", "")
#         profile.experience = data.get("experience", "")
#         profile.skills = data.get("skills", "")

#         # PROFILE PIC
#         if request.FILES.get("profile_pic"):
#             profile.profile_pic = request.FILES.get("profile_pic")

#         profile.save()

#         # RESUME
#         if request.FILES.get("resume"):

#             Resume.objects.create(
#                 user=request.user,
#                 title="My Resume",
#                 file=request.FILES.get("resume")
#             )

        
#         return JsonResponse({"message": "Profile updated"})

from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({
        "message": "CSRF cookie set"
    })

from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Profile, Resume
@login_required
def update_profile(request):

    if request.method == "POST":

        profile, created = Profile.objects.get_or_create(
            user=request.user
        )

        profile.phone = request.POST.get("phone")
        profile.city = request.POST.get("city")
        profile.state = request.POST.get("state")
        profile.education = request.POST.get("education")
        profile.experience = request.POST.get("experience")
        profile.skills = request.POST.get("skills")

        if request.FILES.get("profile_pic"):
            profile.profile_pic = request.FILES.get("profile_pic")

        profile.save()

        # if request.FILES.get("resume"):

        #     Resume.objects.create(
        #         user=request.user,
        #         title="My Resume",
        #         file=request.FILES.get("resume")
        #     )

         # RESUME
    if request.FILES.get("resume"):

        # DELETE OLD RESUME
        Resume.objects.filter(
            user=request.user
        ).delete()

        # CREATE NEW RESUME
        Resume.objects.create(
            user=request.user,
            title="My Resume",
            file=request.FILES.get("resume")
        )

        return JsonResponse({
            "message": "Profile updated successfully"
        })

    return JsonResponse({
        "error": "Invalid request"
    }, status=400)



    # applications
    # 
def job_applications(request):
    applications = JobApplication.objects.select_related("job", "user").all().order_by("-applied_at")

    data = []

    for app in applications:
        data.append({
            "id": app.id,
            "status": app.status,
            "applied_at": app.applied_at,

            # JOB INFO (FIXED)
            "jobPosition": app.job.position,
            "company": app.job.companyName.company_name,
            "location": app.job.state

        })

    return JsonResponse(data, safe=False)




from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import JobApplication

@csrf_exempt
def delete_application(request, app_id):
    if request.method != "DELETE":
        return JsonResponse({"error": "DELETE request required"}, status=400)

    try:
        application = JobApplication.objects.get(id=app_id)
        application.delete()

        return JsonResponse({"message": "Application deleted successfully"})
    
    except JobApplication.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Job


@csrf_exempt
@require_http_methods(["DELETE"])
def delete_job(request, job_id):

    try:
        job = Job.objects.get(id=job_id)

        # DELETE FROM DATABASE
        job.delete()

        return JsonResponse({
            "message": "Job deleted successfully"
        })

    except Job.DoesNotExist:
        return JsonResponse({
            "error": "Job not found"
        }, status=404)        