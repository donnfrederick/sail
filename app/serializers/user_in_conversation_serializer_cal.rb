class UserInConversationSerializerCal < ActiveModel::Serializer
  attributes :id, :username, :name, :type, :sex, :picture_url,
             :country, :country_code, :timezone, :introduce

  # has_many :hobbies
  # has_many :purposes

  def self.each_json(models)
    models.map {|c| JSON.parse(UserInConversationSerializerCal.new(c).to_json) }
  end

  def conversations
    UserSerializerCal.new(object).conversations
  end

  def level
    UserSerializerCal.new(object).level
  end

  def conversation_level
    UserSerializerCal.new(object).conversation_level
  end

  def rated_conversation_level
    UserSerializerCal.new(object).rated_conversation_level
  end

  def country
    UserSerializerCal.new(object).country
  end

  def country_code
    UserSerializerCal.new(object).country_code
  end

  def grade
    UserSerializerCal.new(object).grade
  end

  def highly_reliable
    UserSerializerCal.new(object).highly_reliable
  end

  def name
    UserSerializerCal.new(object).name
  end

  def is_blocked
    Context.instance.current_user.present? && Context.instance.current_user.blocks?(object)
  end

  def is_favorite
    Context.instance.current_user.present? && Context.instance.current_user.favorites?(object)
  end

  def payment_state
    UserSerializerCal.new(object).payment_state
  end
end
