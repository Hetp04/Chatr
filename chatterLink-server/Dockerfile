FROM maven:3.9.0 AS builder

WORKDIR /app

COPY . .

RUN mvn clean install -DskipTests


FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY --from=builder ./app/target/*.jar /app/jar-file/chatter-link-server.jar
COPY /src/main/resources/application.yml /app/config/application.yml

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "/app/jar-file/chatter-link-server.jar", "--spring.config.location=/app/config/application.yml"]