class ApplyDefaultSubscriptionsToPricingTables < ActiveRecord::Migration[5.2]
  def change
    add_column :package_properties, :term, :string, index: true, default: PackageProperty::INTERVAL_MONTHLY
  end

  def data
    return if should_skip?

    PackageProperty.reset_column_information

    PricingTable.create!({
      admin_user_id: AdminUser.first.id,
      name: "Subscriptions",
      package_1_name: "Once",
      package_2_name: "Monthly",
      package_3_name: "Not used",
      package_4_name: "Not used",
      package_5_name: "Not used",
      package_6_name: "Not used",
      package_1: template.deep_merge({
        member: {
          original_price: "6.5",
          discounted_price: "3.9"
        },
        silver: {
          original_price: "6.5",
          discounted_price: "3.9"
        },
        gold: {
          original_price: "6.5",
          discounted_price: "3.9"
        },
        platinum: {
          original_price: "6.5",
          discounted_price: "3.9"
        }
      }),
      package_2: template.deep_merge({
        member: {
          original_price: "19.9",
          discounted_price: "9.9"
        },
        silver: {
          original_price: "19.9",
          discounted_price: "9.9"
        },
        gold: {
          original_price: "19.9",
          discounted_price: "9.9"
        },
        platinum: {
          original_price: "19.9",
          discounted_price: "9.9"
        }
      }),
      package_3: template,
      package_4: template,
      package_5: template,
      package_6: template,
                                         })
  end

  private

    def should_skip?
      PackageProperty.subscriptions.exists?
    end

    def template
      {
        member: {
          original_price: "0",
          discounted_price: "",
          duration: "1",
          original_conversations: "-1",
          bonus_conversations: "0"
        },
        silver: {
          original_price: "0",
          discounted_price: "",
          duration: "1",
          original_conversations: "-1",
          bonus_conversations: "0"
        },
        gold: {
          original_price: "0",
          discounted_price: "",
          duration: "1",
          original_conversations: "-1",
          bonus_conversations: "0"
        },
        platinum: {
          original_price: "0",
          discounted_price: "",
          duration: "1",
          original_conversations: "-1",
          bonus_conversations: "0"
        },
        member_property: {
          currency: "usd"
        },
        silver_property: {
          currency: "usd"
        },
        gold_property: {
          currency: "usd"
        },
        platinum_property: {
          currency: "usd"
        }
      }
    end
end
