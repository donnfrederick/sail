ActiveAdmin.register_page "PairFollowUp" do
  menu parent: I18n.t("activerecord.models.block"), priority: 92

  menu false

  page_action :create, method: :post do
    begin
      target_user = User.find(params[:user_id])
      target_user.follow_up!(admin_only: params[:admin_only].present? && params[:admin_only] != "0")

      path = if target_user.teacher?
               admin_teacher_path(target_user)
             elsif target_user.student?
               admin_student_path(target_user)
             else
               "/admin"
             end
      redirect_to path, notice: "success"
    rescue
      redirect_to "/admin", notice: "error"
    end
  end

  page_action :destroy, method: :delete do
    begin
      target_user = User.find(permitted_params[:from_user_id])
      target_user.unfollow_up!

      path = if target_user.teacher?
               admin_teacher_path(target_user)
             elsif target_user.student?
               admin_student_path(target_user)
             else
               "/admin"
             end
      redirect_to path, notice: "success"
    rescue
      redirect_to "/admin", notice: "error"
    end
  end
end
