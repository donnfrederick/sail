ActiveAdmin.register PointTransaction do

  menu false

  actions :all, except: [:new, :create, :update, :destroy]

  index do
    selectable_column
    id_column
    column :issue do |c|
      link_to(c.issue.id, admin_issue_path(c.issue))
    end
    column :conversation do |c|
      link_to(c.conversation.id, admin_conversation_path(c.conversation))
    end
    column :type
    column :points
    column :created_at do |c|
      c.created_at.to_s
    end
    actions
  end

  filter :issue, as: :select, collection: Issue.all.map {|t| [t.id, "#{t.id}"]}.to_h.invert
  filter :created_at

  show do
    attributes_table do
      row :id
      row :issue do |c|
        link_to(c.issue.id, issue_admin_path(c.issue))
      end
      row :conversation do |c|
        link_to(c.conversation.id, conversation_admin_path(c.conversation))
      end
      row :type
      row :points
      row :created_at do |c|
        c.created_at.to_s
      end
    end
  end
end
