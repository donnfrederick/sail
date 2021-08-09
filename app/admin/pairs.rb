ActiveAdmin.register_page "Pairs" do
  menu parent: I18n.t("activerecord.models.block"), priority: 92

  menu false

  page_action :ban, method: :post do
    begin
      user = User.find(params[:from_user_id])
      Pair.where(from_user_id: params[:from_user_id]).destroy_all
      Pair.create(from_user_id: params[:from_user_id], to_user_id: 1, manual: true)

      url = user.teacher? ? admin_teacher_path(user) : admin_student_path(user)
      redirect_to url, notice: "success"
    rescue
      redirect_to "/admin", notice: "error"
    end
  end

  page_action :destroy, method: :delete do
    begin
      user = User.find(params[:from_user_id])
      Pair.where(from_user_id: params[:from_user_id], to_user_id: params[:to_user_id]).destroy_all

      url = user.teacher? ? admin_teacher_path(user) : admin_student_path(user)
      redirect_to url, notice: "success"
    rescue
      redirect_to "/admin", notice: "error"
    end
  end

  page_action :destroy_all, method: :delete do
    begin
      user = User.find(params[:from_user_id])
      Pair.where(from_user_id: params[:from_user_id]).destroy_all

      url = user.teacher? ? admin_teacher_path(user) : admin_student_path(user)
      redirect_to url, notice: "success"
    rescue
      redirect_to "/admin", notice: "error"
    end
  end

  page_action :ban_from_index, method: :post do
    begin
      user = User.find(params[:from_user_id])
      Pair.where(from_user_id: params[:from_user_id]).destroy_all
      Pair.create(from_user_id: params[:from_user_id], to_user_id: 1, manual: true)

      redirect_back(fallback_location: root_path)
    rescue
      redirect_to "/admin", notice: "error"
    end
  end

  page_action :destroy_all_from_index, method: :delete do
    begin
      user = User.find(params[:from_user_id])
      Pair.where(from_user_id: params[:from_user_id]).destroy_all

      redirect_back(fallback_location: root_path)
    rescue
      redirect_to "/admin", notice: "error"
    end
  end


end
