FROM python:3.12.3

WORKDIR /app

COPY app.py gmailing.py ./

RUN pip install Flask flask-cors

EXPOSE 5000

CMD ["flask", "--app", "app.py", "run", "--host=0.0.0.0"]