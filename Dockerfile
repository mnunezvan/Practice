FROM ruby:3.2.2

# Instala dependencias del sistema (PostgreSQL y herramientas de compilación)
RUN apt-get update -qq && \
    apt-get install -y postgresql-client libpq-dev build-essential

WORKDIR /app
COPY . .

RUN bundle install