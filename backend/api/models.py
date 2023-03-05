from django.db import models
 
class Book(models.Model):
    title = models.CharField(max_length=255)
    cover = models.CharField(max_length=500)
    category = models.CharField(max_length=255)
    cost = models.PositiveIntegerField()
 
    def __str__(self) -> str:
        return self.title