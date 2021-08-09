ActiveAdmin.register GatewayPlan do
  menu parent: "GroupPayment", priority: 30

  permit_params :status

  scope "Stripe", :stripe, default: true
  scope "PayPal", :paypal

  index do
    selectable_column
    id_column
    column :gateway do |c|
      if c.stripe?
        "Stripe"
      elsif c.paypal?
        "PayPal"
      else
        "Fake"
      end
    end
    column :data_id
    actions
  end

  filter :gateway, as: :select, collection: GatewayPlan::GATEWAYS

  show do
    attributes_table do
      row :id
      row :gateway do |c|
        if c.stripe?
          "Stripe"
        elsif c.paypal?
          "PayPal"
        else
          "Fake"
        end
      end
      row :data_id
      row :status do |c|
        c.status || "INACTIVE"
      end
      row :created_at do |c|
        c.created_at.to_s
      end
      row :updated_at do |c|
        c.updated_at.to_s
      end
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    Rails.logger.debug(f.object.errors.full_messages)

    if f.object.paypal?
      f.inputs 'Gateway Subscription Plan Details' do
        f.input :status,  as: :select,
                          collection: ::Paypal::Plan::STATUSES,
                          include_blank: false
      end
    end
    f.actions
  end

  controller do
    def update
      resource.update_status!(params["gateway_plan"]["status"])

      redirect_to admin_gateway_plan_path(resource)
    end
  end
end
