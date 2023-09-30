class UserController < ApplicationController
    def index
        render json: User.all
    end
    
    def show
        render json: User.where(id:params[:id])
    end
end
