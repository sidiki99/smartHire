from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from .models import Job, Category,Student, Company
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({"message": "CSRF cookie set"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
        if request.user.is_authenticated:

          return Response({
        "username": request.user.username,
        "email": request.user.email
    })

@api_view(['GET', 'POST'])
def signup(request):

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if User.objects.filter(username=username).exists():

        return Response({
            "error": "Username already exists"
        })

    # PASSWORD HASHING HAPPENS HERE
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response({
        "message": "Account created successfully"
    })

# =========================
# LOGIN PAGE
# =========================


from django.contrib.auth import login


@api_view(['GET', 'POST'])

def login_view(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password
    )
    

    if user is not None:

        login(request, user)

        return Response({
            "message": "Login successful"
        })

    return Response({
        "error": "Invalid credentials"
    })


# =========================
# LOGOUT PAGE
# =========================



@api_view(['POST'])
def logout_view(request):

    logout(request)

    return Response({
        "message": "Logged out successfully"
    })

# =========================
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
    


from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .models import JobApplication, Resume, Job
from django.contrib.auth.models import User

@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def apply_job(request):

    user = request.user  # must be logged in

    job_id = request.data.get("job")
    resume_id = request.data.get("resume")
    cover_letter = request.data.get("cover_letter")

    job = Job.objects.get(id=job_id)

    # get selected resume
    resume = Resume.objects.get(id=resume_id)

    # create application
    app = JobApplication.objects.create(
        user=user,
        job=job,
        resume=resume,
        cover_letter=cover_letter
    )

    return Response({
        "message": "Application submitted successfully",
        "application_id": app.id
    })



@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def upload_resume(request):
    user = request.user

    file = request.FILES.get("file")
    title = request.data.get("title")

    resume = Resume.objects.create(
        user=user,
        title=title,
        file=file
    )

    return Response({"id": resume.id, "title": resume.title})

@api_view(["GET"])
def get_resumes(request):
    resumes = Resume.objects.filter(user=request.user)

    return Response([
        {
            "id": r.id,
            "title": r.title
        } for r in resumes
    ])