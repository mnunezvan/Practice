#!/usr/bin/env bash
set -o errexit

# Instala dependencias de PostgreSQL (si usas bases de datos)
apt-get update -qq && apt-get install -y libpq-dev postgresql-client || true

bundle install
bundle exec rails assets:precompile