module Organizations
  class PictureController < BaseController
    include Concerns::Language
    before_action :picture, only: [:confirm_to_delete, :show, :destroy]

    validates :create do
      any :picture, description: "multipart/form-data OR base64 encoded files (data:image/jpeg;base64,...)"
    end

    def create
      current_staff.organization.tap do |organization|
        organization.assign_picture = params[:picture]
        organization.save
      end
      redirect_to "/organizations/picture/"
    end

    def show
    end

    def confirm_to_delete
    end

    def destroy
      current_staff.organization.tap do |organization|
        organization.remove_picture!
        organization.save
      end
      redirect_to "/organizations/picture/"
    end

    protected

    def picture
      @picture ||= current_staff.organization.picture
    end
  end
end
