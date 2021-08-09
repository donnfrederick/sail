class IssueSerializer < ActiveModel::Serializer
  attributes :type, :lang, :failure_code, :failure_message,
             :conversations, :expired_at, :created_at, :updated_at

  def type
    object.type.underscore.split("_").shift
  end

  def lang
    Context.instance.current_user.try(:language)
  end
end
