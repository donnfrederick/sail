class AccusationReason < ActiveYaml::Base
  set_root_path "#{Rails.root}/db/datasources/"

  include ActiveModel::Serialization
  include ActiveHash::Associations

  def name
    if respond_to? "name_#{I18n.locale}"
      self.try(:send, "name_#{I18n.locale}")
    else
      self.try(:send, "name_#{I18n.default_locale}")
    end
  end
end
