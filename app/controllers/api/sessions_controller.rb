module Api
  class SessionsController < ApplicationController
    def signin?
      render json: { UserID: session[:user_id] }
    end
  end
end