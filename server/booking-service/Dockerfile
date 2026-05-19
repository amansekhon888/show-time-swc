FROM python:3.12-slim

WORKDIR /usr/src/app

COPY server/booking-service/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY server/booking-service .

EXPOSE 5003

CMD ["python", "manage.py", "runserver", "0.0.0.0:5003"]
