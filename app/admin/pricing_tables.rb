ActiveAdmin.register PricingTable do
  menu parent: "GroupPayment", priority: 1

  actions :all

  permit_params :admin_user_id, :name,
                :package_1_name, :package_2_name, :package_3_name,
                :package_4_name, :package_5_name, :package_6_name,
                package_1: [
                  member: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  silver: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  gold: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  platinum: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ]
                ],
                package_2: [
                  member: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  silver: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  gold: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  platinum: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ]
                ],
                package_3: [
                  member: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  silver: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  gold: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  platinum: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ]
                ],
                package_4: [
                  member: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  silver: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  gold: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  platinum: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ]
                ],
                package_5: [
                  member: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  silver: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  gold: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  platinum: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ]
                ],
                package_6: [
                  member: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  silver: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  gold: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ],
                  platinum: [
                    :original_price, :discounted_price, :currency, :duration, :original_conversations, :bonus_conversations
                  ]
                ]

  index do
    selectable_column
    id_column
    column :name
    column :package_1 do |c|
      c.package_1.label
    end
    column :package_2 do |c|
      c.package_2.label
    end
    column :package_3 do |c|
      c.package_3.label
    end
    column :package_4 do |c|
      c.package_4.label
    end
    column :package_5 do |c|
      c.package_5.label
    end
    column :package_6 do |c|
      c.package_6.label
    end
    actions
  end

  show do
    attributes_table do
      row :id
      row :name
      row :admin_user do |c|
        c.admin_user.try(:email)
      end
      row pricing_table.package_1_name do |c|
        c.package_1.label
      end
      row pricing_table.package_2_name do |c|
        c.package_2.label
      end
      row pricing_table.package_3_name do |c|
        c.package_3.label
      end
      row pricing_table.package_4_name do |c|
        c.package_4.label
      end
      row pricing_table.package_5_name do |c|
        c.package_5.label
      end
      row pricing_table.package_6_name do |c|
        c.package_6.label
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

    f.inputs 'Pricing Table Details' do
      f.input :name
      f.input :package_1_name
      f.input :package_2_name
      f.input :package_3_name
      f.input :package_4_name
      f.input :package_5_name
      f.input :package_6_name
      f.input :admin_user_id, as: :hidden,
                              input_html: { value: current_admin_user.id }
    end

    unless f.object.new_record?
      1.upto 6 do |i|
        name = "package_#{i}"

        span raw "<input type=\"hidden\" name=\"pricing_table[package_#{i}][id]\" value=\"#{f.object.send(name).id}\">"
        span raw "<input type=\"hidden\" name=\"pricing_table[package_#{i}][member][id]\" value=\"#{f.object.send(name).member_property.id}\">"
        span raw "<input type=\"hidden\" name=\"pricing_table[package_#{i}][silver][id]\" value=\"#{f.object.send(name).silver_property.id}\">"
        span raw "<input type=\"hidden\" name=\"pricing_table[package_#{i}][gold][id]\" value=\"#{f.object.send(name).gold_property.id}\">"
        span raw "<input type=\"hidden\" name=\"pricing_table[package_#{i}][platinum][id]\" value=\"#{f.object.send(name).platinum_property.id}\">"

        fieldset class: "inputs" do
          legend do
            span f.object.send("package_#{i}_name") + " (##{i}のパッケージ)"
          end
          ol do
            table do
              tr do
                th ""
                th "メンバー"
                th "シルバー"
                th "ゴールド"
                th "プラチナ"
              end
              tr do
                td "original_price"
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][member][original_price]\" value=\"#{f.object.send(name).member_property.original_price}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][silver][original_price]\" value=\"#{f.object.send(name).silver_property.original_price}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][gold][original_price]\" value=\"#{f.object.send(name).gold_property.original_price}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][platinum][original_price]\" value=\"#{f.object.send(name).platinum_property.original_price}\">"
                end
              end
              tr do
                td "discounted_price"
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][member][discounted_price]\" value=\"#{f.object.send(name).member_property.discounted_price}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][silver][discounted_price]\" value=\"#{f.object.send(name).silver_property.discounted_price}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][gold][discounted_price]\" value=\"#{f.object.send(name).gold_property.discounted_price}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][platinum][discounted_price]\" value=\"#{f.object.send(name).platinum_property.discounted_price}\">"
                end
              end
              tr do
                td "currency"
                td do
                  keyword = "member_property"
                  original_currency = f.object.send(name).send(keyword).currency
                  html  = "<select name=\"pricing_table[package_#{i}][#{keyword}][currency]\">"
                  PackageProperty.available_currencies.each do |currency|
                    html += "<option value=\"#{currency}\"#{original_currency === currency ? " selected" : ""}>#{currency.upcase}</option>"
                  end
                  html += "</select>"
                  span raw html
                end
                td do
                  keyword = "silver_property"
                  original_currency = f.object.send(name).send(keyword).currency
                  html  = "<select name=\"pricing_table[package_#{i}][#{keyword}][currency]\">"
                  PackageProperty.available_currencies.each do |currency|
                    html  += "<option value=\"#{currency}\"#{original_currency === currency ? " selected" : ""}>#{currency.upcase}</option>"
                  end
                  html += "</select>"
                  span raw html
                end
                td do
                  keyword = "gold_property"
                  original_currency = f.object.send(name).send(keyword).currency
                  html  = "<select name=\"pricing_table[package_#{i}][#{keyword}][currency]\">"
                  PackageProperty.available_currencies.each do |currency|
                    html  += "<option value=\"#{currency}\"#{original_currency === currency ? " selected" : ""}>#{currency.upcase}</option>"
                  end
                  html += "</select>"
                  span raw html
                end
                td do
                  keyword = "platinum_property"
                  original_currency = f.object.send(name).send(keyword).currency
                  html  = "<select name=\"pricing_table[package_#{i}][#{keyword}][currency]\">"
                  PackageProperty.available_currencies.each do |currency|
                    html  += "<option value=\"#{currency}\"#{original_currency === currency ? " selected" : ""}>#{currency.upcase}</option>"
                  end
                  html += "</select>"
                  span raw html
                end
              end
              tr do
                td "duration"
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][member][duration]\" value=\"#{f.object.send(name).member_property.duration}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][silver][duration]\" value=\"#{f.object.send(name).silver_property.duration}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][gold][duration]\" value=\"#{f.object.send(name).gold_property.duration}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][platinum][duration]\" value=\"#{f.object.send(name).platinum_property.duration}\">"
                end
              end
              tr do
                td "original_conversations"
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][member][original_conversations]\" value=\"#{f.object.send(name).member_property.original_conversations}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][silver][original_conversations]\" value=\"#{f.object.send(name).silver_property.original_conversations}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][gold][original_conversations]\" value=\"#{f.object.send(name).gold_property.original_conversations}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][platinum][original_conversations]\" value=\"#{f.object.send(name).platinum_property.original_conversations}\">"
                end
              end
              tr do
                td "bonus_conversations"
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][member][bonus_conversations]\" value=\"#{f.object.send(name).member_property.bonus_conversations}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][silver][bonus_conversations]\" value=\"#{f.object.send(name).silver_property.bonus_conversations}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][gold][bonus_conversations]\" value=\"#{f.object.send(name).gold_property.bonus_conversations}\">"
                end
                td do
                  span raw "<input name=\"pricing_table[package_#{i}][platinum][bonus_conversations]\" value=\"#{f.object.send(name).platinum_property.bonus_conversations}\">"
                end
              end
            end
          end
        end
      end
    end
    f.actions
  end

  controller do
    def create
      pricing_table = PricingTable.create!(permitted_params["pricing_table"])
      redirect_to admin_pricing_table_path(pricing_table.id)
    end

    def update
      attrs = permitted_params["pricing_table"].select {|k, _v| PricingTable.column_names.include?(k) }
      resource.update(attrs)

      sub_params = permitted_params["pricing_table"].reject {|k, _v| PricingTable.column_names.include?(k) }
      sub_params.each do |key, attrs_|
        nth = key.match(/[0-9]+/)[0]
        resource.update_package!(nth, attrs_)
      end

      redirect_to admin_pricing_table_path(resource.id)
    end
  end
end
