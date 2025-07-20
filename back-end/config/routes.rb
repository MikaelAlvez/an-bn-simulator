Rails.application.routes.draw do
  post "/analyze", to: "recognizer#analyze"
end
