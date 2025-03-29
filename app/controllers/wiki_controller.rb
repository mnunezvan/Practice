class WikiController < ApplicationController
    def show
      image_html = ActionController::Base.helpers.image_tag('estrellita.jpg', alt: 'Estrellita')
      render html: "<h1>¡Hola ayudante estrella! 🌟</h1>#{image_html}".html_safe
    end
  end