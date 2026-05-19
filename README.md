# ShowTime

A Dockerized microservices sample project with a Node.js catalog service, API gateway, RabbitMQ notification service, Spring Boot identity service, Django booking service, and a simple React client.

## Services

- `catalog-service`: Node.js + Express + MongoDB for movie catalog.
- `api-gateway`: Node.js Express gateway forwarding `/movies` requests to catalog service.
- `notification-service`: Node.js RabbitMQ consumer listening to `booking_queue`.
- `identity-service`: Spring Boot app with a basic `/auth/test` endpoint.
- `booking-service`: Django REST app with `/booking/test` endpoint.
- `client`: React UI to add and list movies from the API gateway.

## Run Locally

1. Ensure Docker is installed.
2. From the repository root:

```bash
docker-compose up --build
```

3. Open the React UI at `http://localhost:3000` after installing client dependencies:

```bash
cd client
npm install
npm start
```

## API Endpoints

- `GET http://localhost:5000/movies`
- `POST http://localhost:5000/movies`
- `GET http://localhost:5002/auth/test`
- `GET http://localhost:5003/booking/test`

## Notes

- Services use Docker network names (`mongodb`, `rabbitmq`, `postgres`, `catalog-service`).
- The React app points to the API gateway.
- The `shared-code` folder contains reusable logger and error handler helpers.
