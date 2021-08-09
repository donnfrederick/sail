class CurrentUserSerializer < ActiveModel::Serializer
  attributes :email, :birthday, :auth_token, :web_socket_token,
             :id, :username, :name, :name_ja, :type, :sex, :picture_url,
             :level, :conversation_level, :rated_conversation_level,
             :country, :country_code, :timezone, :desired_condition,:introduce,
             :evaluate, :location, :lateness, :unread_count,
             :conversations, :absence,
             :is_favorite, :is_blocked,
             :grade, :highly_reliable

  has_many :hobbies
  has_many :purposes

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
    false
  end

  def is_favorite
    false
  end
end
