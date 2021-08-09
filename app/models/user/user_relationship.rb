class User

  after_save :destroy_follow_up, if: :invalid_as_foreigner_changed?
  after_save :destroy_follow_up, if: :invalid_as_ridiculous_changed?

  def excludes?(user)
    allows = Pair.allow_user_ids(self.id)
    allows.present? ? allows.exclude?(user.id) : false
  end

  def block(user)
    block = Block.new({from_user_id: self.id, to_user_id: user.id})
    block.save!
  end

  # TODO サービスクラスに移動したい
  def unblock(user)
    Block.by_from_user(self).by_to_user(user).destroy_all
    # お知らせデータの復活
    notifications = Notification.user_by(self).published.select {|u| u.mentions_about?(user) }
    notification_ids = notifications.map(&:id)
    Notification.where(id: notification_ids).update_all(deleted_at: nil)
  end

  def blocks?(user)
    blocks_from_user.include? user
  end

  def blocked_by?(user)
    blocks_to_user.include?(user)
  end

  def blocks_implicitly?(user)
    pairs_from_user.count > 0 && pairs_from_user.exclude?(user)
  end

  def favorites?(user)
    favorites_from_user.include? user
  end

  def favorite_by?(user)
    favorites_to_user.include?(user)
  end

  def favorite(user)
    Favorite.new(from_user_id: self.id, to_user_id: user.id).save
  end

  def unfavorite(user)
    Favorite.by_from_user(self).by_to_user(user).destroy_all
  end

  def paired_users
    pairs_from_user.pluck(:id) & pairs_to_user.pluck(:id)
  end

  def followed_up?
    self.pair_from_user.only_follow_up.exists?
  end

  def destroy_follow_up
    return if self.invalid_as_foreigner? || self.invalid_as_ridiculous?

    self.pair_from_user.only_follow_up.destroy_all
  end

  def privileged?
    pairs_from.only_privilege.exists?
  end

  def destroy_privilege
    self.pair_from_user.only_privilege.destroy_all
  end
end
