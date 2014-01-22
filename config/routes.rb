Donutmap::Application.routes.draw do
  resources :locations

  root 'static_pages#home'
  match '/about',   to: 'static_pages#about',   via: 'get'
end
