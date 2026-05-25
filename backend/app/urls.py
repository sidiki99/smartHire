from django.urls import path
from .views import (
        home,
        add_student,
        get_students,
        add_company,
        add_job,
        get_companies,
        get_category,
        get_job,
        signup,
        login_view,
        logout_view,
        current_user,csrf,
        apply_job,
         get_resumes)

urlpatterns = [
    path('', home),
    path('add-student/', add_student),
    path('students/', get_students),
    path('company/', add_company),
    path("get_company/", get_companies),
    path("get_category/",get_category),
    path("add_job/", add_job),
    path("get_job/", get_job),
     path('signup/', signup),

    path('login/', login_view),

    path('logout/', logout_view),

    path('user/', current_user),
    path("csrf/", csrf),
    path("apply_job/", apply_job),
      path("resumes/", get_resumes)
]

