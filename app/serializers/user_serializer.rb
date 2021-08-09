class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :name_ja, :type, :sex, :picture_url,
             :level, :conversation_level, :rated_conversation_level,
             :country, :country_code, :timezone, :introduce,
             :desired_condition, :evaluate, :location, :lateness, :absence,
             :is_favorite, :is_blocked, :payment_state,
             :grade, :highly_reliable,
             :conversations

  has_many :hobbies
  has_many :purposes

  has_many :organizations
  has_many :organization_sections
  # has_many :conversations

  def conversations
    object.visible_conversations.matched.finished.map do |c|
      JSON.parse(ConversationsInUserSerializer.new(c).to_json)
    end
  end

  def level
    object.level.nil? ? nil : I18n.t("user.level.level_#{object.level.to_s}")
  end

  def conversation_level
    object.conversation_level.nil? ? nil : I18n.t("user.conversation_level.level_#{object.conversation_level.to_s}")
  end

  def rated_conversation_level
    if object.rated_conversation_level == 0
      nil
    else
      I18n.t("user.conversation_level.level_#{object.rated_conversation_level.to_s}")
    end
  end

  def country
    tmp_country = ISO3166::Country[object.country]

    return nil if tmp_country.nil?

    tmp_country.translations[I18n.locale.to_s].presence || tmp_country.name
  end

  def country_code
    object.country
  end

  def grade
    object.try(:grade).try(:name).try(:downcase)
  end

  def highly_reliable
    object.student? ? false : object.highly_reliable?
  end

  def name
    if object.has_attribute? "name_#{I18n.locale}"
      object.try(:send, "name_#{I18n.locale}").presence || object.name
    else
      object.try(:send, "name_#{I18n.default_locale}").presence || object.name
    end
  end

  def is_blocked
    current_user.present? && current_user.blocks?(object)
  end

  def is_favorite
    current_user.present? && current_user.favorites?(object)
  end

  def payment_state
    if current_user.present?
      if current_user.free?
        "free"
      elsif current_user.paid?
        "paid"
      else
        "empty"
      end
    else
      "hidden"
    end
  end

  private

    def current_user
      Context.instance.current_user
    end
end
