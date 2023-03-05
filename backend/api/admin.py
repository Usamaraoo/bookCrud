from django.contrib import admin

from .models import Book

class AuthorAdmin(admin.ModelAdmin):
    pass
admin.site.register(Book, AuthorAdmin)