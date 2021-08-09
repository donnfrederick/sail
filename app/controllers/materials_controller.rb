class MaterialsController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def show
    material = Material.find_by_name!(params[:id])
    material.count_up_views!
    redirect_to material.url
  end

  def not_found
    render "error/404", status: :not_found, layout: "application"
  end
end
