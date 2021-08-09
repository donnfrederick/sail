ActiveAdmin.register CouponOwner do
  menu parent: "GroupPayment", priority: 11

  actions :all

  permit_params :email, :coupon_id

  index do
    selectable_column
    id_column
    column :email
    column :coupon do |c|
      c.coupon.try(:code)
    end

    actions
  end

  filter :email

  show do
    attributes_table do
      row :id
      row :email
      row :coupon do |c|
        c.coupon.try(:code)
      end
      row :used do |c|
        c.used? ? "Yes" : "No"
      end
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    Rails.logger.debug(f.object.errors.full_messages)

    f.inputs 'Coupon Owner Details' do
      f.input :email
      f.input :coupon, as: :select, collection: Coupon.all.map{|u| ["#{u.id}: #{u.code}", u.id] }
    end
    f.actions
  end
end
