
from django.urls import path
from . import views

urlpatterns = [
        path('', views.ApiOverview, name='home'),
        path('create/', views.add_items, name='add-items'),
        path('all/', views.view_items, name='view_items'),
        path('all/<int:pk>/', views.get_single_items, name='get_single_items'),
        path('update/<int:pk>/', views.update_items, name='update-items'),
         path('book/<int:pk>/delete/', views.delete_items, name='delete-items'),
]