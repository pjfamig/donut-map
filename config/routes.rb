Donutmap::Application.routes.draw do
  resources :locations

  root 'locations#index'
  match '/about',   to: 'static_pages#about',   via: 'get'
end
