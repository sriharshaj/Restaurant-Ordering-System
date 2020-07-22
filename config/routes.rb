Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'items', to: 'items#index'
      get 'items/:id', to: 'items#show'
      post 'items/create'
      patch 'items/:id', to: 'items#update'
      delete 'items/:id', to: 'items#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
