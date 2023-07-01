from django.shortcuts import render, redirect
from . import models
from django.forms.models import model_to_dict

from . import serializers
import random
elList = []
score_list = []
def play(request):
    global elList
    elList = [model_to_dict(i) for i in models.Elements.objects.all()]
    random.shuffle(elList)

    context = {
        'data': elList
    }


    return render(request, "game_app/final.html", context)
def htp (request):

    return render(request, "game_app/htp.html")
def leaderboards(request):
    score_list = [model_to_dict(i) for i in models.Score.objects.all()]
    score_list = sorted(score_list, key = lambda a: int(a['score']), reverse=True)
    context = {
        'data': score_list
    }
    return render(request, "game_app/leaderboards.html", context)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Elements
from .serializers import ScoreSerializer

class ElementPostView(APIView):
    def post(self, request, *args, **kwargs):
        data = {
            'id': request.data.get('id'),
            'symbol': request.data.get('answer')
        }
        obj = Elements.objects.get(pk = data['id'])
        if obj.identity == data['symbol']:

            return Response(True, status=status.HTTP_201_CREATED)
        else:

            return Response(False, status=status.HTTP_201_CREATED)

class ScorePostView(APIView):
    def post(self, request, *args, **kwargs):
        data = {
            'score': request.data.get('score'),
            'username': request.data.get('username')
        }
        serializer = serializers.ScoreSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(True, status=status.HTTP_201_CREATED)
        else:
            return Response(False, status=status.HTTP_201_CREATED)




