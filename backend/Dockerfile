FROM python:3.8.5
ENV PYTHONUNBUFFERED 1

ARG DJANGO_ALLOWED_HOSTS
ARG DJANGO_SECRET_KEY
ARG DJANGO_CORS_ALLOWED_ORIGINS

ENV ALLOWED_HOSTS $DJANGO_ALLOWED_HOSTS
ENV SECRET_KEY $DJANGO_SECRET_KEY
ENV CORS_ALLOWED_ORIGINS $DJANGO_CORS_ALLOWED_ORIGINS

RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/
EXPOSE 8000
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
COPY . /backend/
RUN python manage.py makemigrations
RUN python manage.py migrate
