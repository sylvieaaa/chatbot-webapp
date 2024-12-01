
from django.urls import path
from .views.views import ChatAPIView, ChatHistoryListView

urlpatterns = [
    path('post-chat/', ChatAPIView.as_view(), name='chat'),
    path('chat-history/', ChatHistoryListView.as_view(), name='chat-history'),
]
