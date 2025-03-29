# config/puma.rb
port ENV.fetch("PORT") { 3000 }  # Render inyecta el puerto via ENV['PORT']
environment ENV.fetch("RAILS_ENV") { "production" }