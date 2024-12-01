from django.db import models
from django.contrib.auth.models import User


class ChatHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_message = models.TextField()  # The message from the user
    chatbot_response = models.TextField()  # The response from the chatbot
    created_at = models.DateTimeField(
        auto_now_add=True)  # Timestamp for the chat entry

    def __str__(self):
        return f"Chat with {self.user.username} at {self.created_at}"
