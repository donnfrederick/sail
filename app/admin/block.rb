ActiveAdmin.register Block do
  menu parent: I18n.t("activerecord.models.block"), priority: 91

  permit_params :from_user_id, :to_user_id

  controller do
    def scoped_collection
      Block.includes(:to_user, :from_user)
    end
  end

  index do
    selectable_column
    id_column
    column :from_user
    column :to_user
    column :created_at do |c|
      c.created_at.to_s
    end
    actions
  end

  filter :from_user, as: :select, collection: proc { User.all.map{|x| ["#{x.id}: #{x.name}", x.id] } }
  filter :to_user,   as: :select, collection: proc { User.all.map{|x| ["#{x.id}: #{x.name}", x.id] } }

  form do |f|
    f.inputs do
      f.input :from_user,  as: :select,collection: User.includes(:organizations).map{|u| ["#{u.id}: #{u.organizations.first.try(:name)} > #{u.name}", u.id] }
      f.input :to_user,  as: :select,collection: User.includes(:organizations).map{|u| ["#{u.id}: #{u.organizations.first.try(:name)} > #{u.name}", u.id] }
    end
    f.actions
  end

  controller do
    def create
      blocker_user = User.find(permitted_params[:block][:from_user_id])
      blocked_user = User.find(permitted_params[:block][:to_user_id])
      service = BlockService.new(blocker_user)
      service.block(blocked_user)
      redirect_to admin_block_path(service.block_record.try(:id) || Block.last.id)
    end

    def update
      # Do nothing
    end
  end
end
