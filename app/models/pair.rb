class Pair < ApplicationRecord
  belongs_to :from_user, class_name: "User", foreign_key: "from_user_id"
  belongs_to :to_user,   class_name: "User", foreign_key: "to_user_id"

  scope :only_follow_up, -> { where(follow_up: true) }
  scope :only_privilege, -> { where(manual: false, follow_up: false) }

  validates :to_user, uniqueness: { scope: :from_user }

  # ペア指定によってto_userを暗示的にブロックしているユーザーIDを取得する
  def self.blocker_ids(to_user_id)
    from_user_ids = Pair.where.not(to_user_id: to_user_id).pluck(:from_user_id).uniq
    from_user_ids.select do |i|
      Pair.where(from_user_id: i, to_user_id: to_user_id).count == 0
    end
  end

  # ペア指定されているものだけ取得する
  # 空のときはペア指定がない
  def self.allow_user_ids(from_user_id)
    Pair.where(from_user_id: from_user_id).pluck(:to_user_id)
  end
end
