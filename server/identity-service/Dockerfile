FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /usr/src/app
COPY server/identity-service/pom.xml ./
COPY server/identity-service/src ./src
RUN mvn -B package -DskipTests

FROM eclipse-temurin:17-jre-jammy
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/target/identity-service-0.0.1-SNAPSHOT.jar ./identity-service.jar
EXPOSE 5002
ENTRYPOINT ["java", "-jar", "identity-service.jar"]
