from django.contrib import admin
from chat.models import ChatHistory

# Register your models here.


@admin.register(ChatHistory)
class ChatAdmin(admin.ModelAdmin):
    pass
