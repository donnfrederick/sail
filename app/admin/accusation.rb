ActiveAdmin.register Accusation do
  menu parent: I18n.t("activerecord.models.accusation"), priority: 90

  actions :index, :destroy

  permit_params :conversation_id, :from_user_id, :to_user_id, :accusation_reason_id

  controller do
    def scoped_collection
      Accusation.includes(:conversation, :to_user, :from_user)
    end
  end

  index do
    selectable_column
    id_column
    column :conversation
    column :from_user
    column :to_user
    column :accusation_reason
    column :created_at do |c|
      c.created_at.to_s
    end
    actions
  end

  filter :from_user, as: :select, collection: proc { User.all.map{|x| ["#{x.id}: #{x.name}", x.id] } }
  filter :to_user,   as: :select, collection: proc { User.all.map{|x| ["#{x.id}: #{x.name}", x.id] } }
  filter :accusation_reason_id, as: :select, collection: AccusationReason.all.map{|x| [x.name, x.id] }
end
