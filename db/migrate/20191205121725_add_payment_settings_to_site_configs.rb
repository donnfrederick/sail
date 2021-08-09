class AddPaymentSettingsToSiteConfigs < ActiveRecord::Migration[5.2]
  def change
    # nothing to do
  end

  def data
    SiteConfig.reset_column_information

    args = [
      {
        admin_user: AdminUser.first,
        keyword: "user.student.payment.trial.duration",
        content: 2,
        format: SiteConfig::FORMAT_INT
      },
      {
        admin_user: AdminUser.first,
        keyword: "user.student.payment.trial.term",
        content: "week",
        format: SiteConfig::FORMAT_STRING
      }
    ]
    args.each {|attrs| SiteConfig.create!(attrs) }
  end
end
