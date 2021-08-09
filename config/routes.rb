Rails.application.routes.draw do
  root "pages#index"

  # @deprecated ひとつ下の materials に移行しています

  resources :materials, only: [:show]

  namespace :billing do
    namespace :students do
      get "payment_methods/:auth_token", to: "payment_methods#index"
      get "points/overview/:auth_token", to: "points#overview"
      namespace :issues do
        get    "paypal/new/:auth_token",    to: "paypal#new"
        post   "paypal/new/:auth_token",    to: "paypal#new"
        post   "paypal/charge/:auth_token", to: "paypal#charge"
        get    "paypal/result/:auth_token", to: "paypal#new"
        get  "stripe/new/:auth_token",    to: "stripe#new"
        post "stripe/new/:auth_token",    to: "stripe#new"
        post "stripe/charge/:auth_token", to: "stripe#charge"
        get  "stripe/result/:auth_token", to: "stripe#result"
        namespace :paypal do
          get   "cancel/:auth_token/:id",   to: "cancel#new"
          post  "cancel/:auth_token/:id",   to: "cancel#create"
        end
        namespace :stripe do
          get   "cancel/:auth_token/:id",   to: "cancel#new"
          post  "cancel/:auth_token/:id",   to: "cancel#create"
        end
      end
    end
  end

  get "organizations", to: "organizations#signin"
  namespace :organizations do
    get "signin"
    post "create"
    get "signout", action: "destroy"
    get "errors/no_contract_:type", to: "errors#no_contract"

    resource :picture, except: :update, controller: :picture do
      collection do
        get "confirm_to_delete", action: "confirm_to_delete"
      end
    end

    get "recovery", to: "recovery#new"
    resources :recovery, param: :digest, only: [:new, :create, :edit, :update], controller: :recovery do
      get "created"
    end

    get "invitees/:digest/confirm", to: "invitees#confirm"
    post "invitees/:digest/accept", to: "invitees#accept"
    get "invitees/invalid", to: "invitees#invalid"
    get "invitees/:digest", to: "invitees#signin"

    # エンドユーザー向け
    namespace :users do
      resources :sessions, only: :create
    end

    # Ajax API
    namespace :ajax do
      namespace :calendar do
        get "waiting_teacher_conversations"
        get "waiting_student_conversations"
      end
    end

    namespace :api, { format: 'json' } do
      namespace :v1 do
        resources :issues
      end
    end

    # 共通
    ["nhs", "univs"].each do |org|
      namespace org do
        get "videos/play/:conversation_id",  to: "videos#play"

        resources :users
        resources :conversations do
          collection do
            get "new/:dimension_id/:user_id/:start_at", to: "conversations#new"
            get "table/:id",                            to: "conversations#table"
            get "calendar/:id",                         to: "conversations#calendar"
            # get "create",                               to: "conversations#create"
            get "confirm_before_create",                to: "conversations#confirm_before_create"
            get "destroy/:conversation_id/:user_id/:ambush(/:dimension_id)",                 to: "conversations#destroy"
            get "confirm_before_delete/:conversation_id/:user_id/:ambush(/:dimension_id)",   to: "conversations#confirm_before_delete"
            get "show/:conversation_id/:user_id(/:id)",                                      to: "conversations#show"
            get "confirm_before_reserve/:reservable_conversation_id/:user_id/:dimension_id/:start_at", to: "conversations#confirm_before_reserve"
            get "reserve/:dimension_id", to: "conversations#reserve"
          end
        end

        resources "notifications", param: :notification_id do
          collection do
            put ":notification_id/edit",                     to: "notifications#update"
            get ":notification_id/confirm_before_publish",   to: "notifications#confirm_before_publish"
            post "publish",                                  to: "notifications#publish"
            get ":notification_id/confirm_before_unpublish", to: "notifications#confirm_before_unpublish"
            post "unpublish",                                to: "notifications#unpublish"
            get ":notification_id/confirm_before_delete",        to: "notifications#confirm_to_delete"
          end
        end
      end
    end

    # 個別
    namespace :univs do
      resources :invitations, param: :token, except: [:update, :edit] do
        collection do
          get "confirm_to_delete/:token", to: "invitations#confirm_to_delete"
        end
      end
    end

    namespace :nhs do
      resources :sections, param: :organization_section_id, only: :show do
        collection do
          get "update", to: "sections#update"
        end
      end
      resources :tablets, param: :organization_device_id, only: [:index, :edit, :update] do
        collection do
          put ":organization_device_id/edit", to: "tablets#update"
        end
      end
    end

    namespace :preferences do
      resource :email, only: [:show, :edit], controller: :email do
        collection do
          put "edit", to: "email#update"
        end
      end
      resource :password, only: :edit, controller: :password do
        collection do
          put "edit", to: "password#update"
        end
      end
    end
  end

  # Helte Admin
  devise_config = ActiveAdmin::Devise.config
  devise_config[:controllers][:omniauth_callbacks] = "admin/omniauth_callbacks"
  devise_for :admin_users, devise_config
  ActiveAdmin.routes(self) rescue ActiveAdmin::DatabaseHitDuringLoad

  get "admin/report/monthly_conversations/:id(/:year_month)", to: "admin/report#monthly_conversations"
  post   "admin/pair_follow_up/:user_id", to: "admin/pair_follow_up#create"
  delete "admin/pair_follow_up/:user_id", to: "admin/pair_follow_up#destroy"

  # ActionCable
  mount ActionCable.server => "/cable/v1"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :environments, only: [:index]

      resources :teachers, only: [:create, :show], defaults: { locale: :ja } do
        collection do
          get    :me, to: "teachers#me"
          patch  :me, to: "teachers#update"
          delete :me, to: "teachers#destroy"
          post   :validate, to: "teachers#validate"
          get    :hobbies,  to: "teachers#hobbies"
          get    :purposes, to: "teachers#purposes"
          post   :password, to: "teachers#password_reset_email"
          patch  :password, to: "teachers#password_reset_update"
          get    :categories, to: "teachers#categories"
          get    :tags, to: "teachers#tags"
          get    :getselectedtags, to: "teachers#getselectedtags"
          get   :add_tag, to: "teachers#add_tag"
          get   :added_tag, to: "teachers#added_tag"
          get   :delete_added_tags, to: "teachers#delete_added_tags"
          get   :add_selected_tag, to: "teachers#add_selected_tag"
        end
        member do
          get :evaluations
        end
      end

      namespace :teachers do
        post   :signin,  to: "sessions#create"
        delete :signout, to: "sessions#destroy"
      end

      resources :students, only: [:create, :show], defaults: { locale: :en } do
        collection do
          get    :me, to: "students#me"
          patch  :me, to: "students#update"
          delete :me, to: "students#destroy"
          post   :validate, to: "students#validate"
          get    :hobbies,  to: "students#hobbies"
          get    :purposes, to: "students#purposes"
          get    :categories, to: "students#categories"
          get    :tags, to: "students#tags"
          get    :getselectedtags, to: "students#getselectedtags"
          get   :add_tag, to: "students#add_tag"
          get   :added_tag, to: "students#added_tag"
          get   :delete_added_tags, to: "students#delete_added_tags"
          get   :add_selected_tag, to: "students#add_selected_tag"
          post   :password, to: "students#password_reset_email"
          patch  :password, to: "students#password_reset_update"
          post :charge, to: "students#charge"
          get :stripe, to: "students#stripe"
          get :packages, to: "students#packages"
        end
        member do
          get :evaluations
        end
      end

      namespace :students do
        post   :signin,  to: "sessions#create"
        delete :signout, to: "sessions#destroy"
      end

      resource :phone_authentication, only: [:create, :update]

      resources :conversations, only: [:index, :show, :create, :destroy] do
        collection do
          get  :calendar,  to: "conversations#calendar"
          get  :recommend, to: "conversations#recommend"
          get  "recommend/:id", to: "conversations#show_recommend"
          post :reserve,   to: "conversations#reserve"
          get  "cancelled/:id", to: "conversations#show_cancelled"
          get "requests_from_students", to: "conversations#only_accepting_requests"
        end
        member do
          post    :evaluate2, to: "conversations#evaluate"
          patch   :evaluate2, to: "conversations#evaluate"
          post    :report
          patch   :report
          post    :memo
          patch   :memo
          post    :start
        end
      end

      resources :conversation_requests, except: [:show]

      resources :issues, only: [:create] do
        collection do
          get :pk, to: "issues#pk"
          get :packages, to: "issues#packages" 
        end
      end

      namespace :locations, defaults: { locale: :en } do
        get :countries
        get :timezones
      end

      namespace :organizations, defaults: { locale: :ja } do
        get  :users
        post :signin, to: "sessions#create"
      end

      resources :notifications, only: [:index, :show] do
        collection do
          get :stats, to: "notifications#stats"
        end
      end

      resources :accusations, only: [:create] do
        collection do
          get :reasons, to: "accusations#reasons"
        end
      end

      resources :blocks, only: [:index, :create]
      resources :chats, only: [:index, :create]
      delete "blocks", to: "blocks#destroy"

      resources :favorites, only: [:index, :create]
      delete "favorites", to: "favorites#destroy"

      resources :history, only: [:index]

      namespace :billing do
        namespace :students do
          namespace :issues do
            get :available
            post :charge, to: "students#charge"
            get :stripe, to: "students#stripe"
            get :packages, to: "students#packages"
          end
        end
      end

      resources :statistics, only: [:index] do
        collection do
          get :distribution, to: "statistics#distribution"
        end
      end

      namespace :paypal do
        resource :orders,        only: [:create]
        resource :agreements,    only: [:create]
        resource :subscriptions, only: [:create]
      end

      resources :client_logs, only: [:create]
    end
  end

  namespace :webhook, defaults: { format: :json } do
    namespace :v1 do
      namespace :sora do
        post :connection
        post :archives
      end
      namespace :paypal do
        post :event
      end
      namespace :stripe do
        post :event
      end
      namespace :googleplay, only: [:create, :show], defaults: { format: :json  } do
        get  'show', to: 'show'
        post  'show', to: 'show'
        get  'index', to: 'index'
        post  'new', to: 'new'
        post  'update', to: 'update'
      end
    end
  end

  # SPA Routing
  get "*path", to: "pages#index"
end
