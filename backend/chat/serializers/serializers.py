from rest_framework import serializers
from chat.models import ChatHistory


class ChatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHistory
        fields = ['user', 'user_message', 'chatbot_response', 'created_at']
        read_only_fields = ['created_at']
