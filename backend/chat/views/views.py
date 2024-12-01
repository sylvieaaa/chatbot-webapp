from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from chat.serializers.serializers import ChatHistorySerializer
from chat.models import ChatHistory


class ChatAPIView(generics.CreateAPIView):
    # Only authenticated users can interact with the chatbot
    permission_classes = [IsAuthenticated]
    serializer_class = ChatHistorySerializer

    def post(self, request):
        # Get the user's message from the request
        user_message = request.data.get('user_message')
        if not user_message:
            return Response({"error": "No message provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Get the AI response using the generate_response function
        api_service = ChatService()
        ai_response = api_service.generate_response(user_message)
        # Save the chat history
        chat_history_data = {
            'user': request.user.pk,  # The authenticated user
            'user_message': user_message,
            'chatbot_response': ai_response
        }
        serializer = self.serializer_class(data=chat_history_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Handle serializer errors if saving fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatHistoryListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatHistorySerializer

    def get_queryset(self):
        return ChatHistory.objects.filter(user=self.request.user).order_by('created_at')
