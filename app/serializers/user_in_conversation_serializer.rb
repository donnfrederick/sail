class UserInConversationSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :type, :sex, :picture_url,
             :level, :conversation_level, :rated_conversation_level,
             :country, :country_code, :timezone, :introduce,
             :desired_condition, :evaluate, :location, :lateness, :absence,
             :is_favorite, :is_blocked, :payment_state,
             :grade, :highly_reliable,
             :conversations

  has_many :hobbies
  has_many :purposes

  def self.each_json(models)
    models.map {|c| JSON.parse(UserInConversationSerializer.new(c).to_json) }
  end

  def conversations
    UserSerializer.new(object).conversations
  end

  def level
    UserSerializer.new(object).level
  end

  def conversation_level
    UserSerializer.new(object).conversation_level
  end

  def rated_conversation_level
    UserSerializer.new(object).rated_conversation_level
  end

  def country
    UserSerializer.new(object).country
  end

  def country_code
    UserSerializer.new(object).country_code
  end

  def grade
    UserSerializer.new(object).grade
  end

  def highly_reliable
    UserSerializer.new(object).highly_reliable
  end

  def name
    UserSerializer.new(object).name
  end

  def is_blocked
    Context.instance.current_user.present? && Context.instance.current_user.blocks?(object)
  end

  def is_favorite
    Context.instance.current_user.present? && Context.instance.current_user.favorites?(object)
  end

  def payment_state
    UserSerializer.new(object).payment_state
  end
end
