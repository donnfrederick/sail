class User
  # ユーザー同士の相性をスコア化する
  # Student から見た Teacher のスコアを算出する
  # TODO: cache
  def score(partner)
    return 0 unless student?

    score = 0

    # 興味のあること (0 〜 +30)
    #   選択した項目が合致していれば加算
    matched_hobby_ids = self.users_hobbies.pluck(:hobby_id) &&
                        partner.users_hobbies.pluck(:hobby_id)

    score += (10 * matched_hobby_ids.count)

    # 利用目的(0 〜 +42)
    #   PURPOSE_SCORES に沿ったスコアを加算
    my_purpose_ids      = self.users_purposes.pluck(:purpose_id).map(&:to_s)
    partner_purpose_ids = partner.users_purposes.pluck(:purpose_id).map(&:to_s)

    my_purpose_ids.each do |my_purpose_id|
      next if Conversation::PURPOSE_SCORES[my_purpose_id].nil?

      score += Conversation::PURPOSE_SCORES[my_purpose_id].slice(*partner_purpose_ids).values.sum
    end

    # 評価
    # 相手が「不満がある」と評価した数だけスコアを減点する
    score -= partner.evaluation_score

    # 遅刻数 (0 〜 -10)
    # 相手の遅刻率が高い場合はスコアを減点する
    unless partner.lateness.zero?
      ratio = partner.lateness / partner.conversations.finished.count
      score -= ratio / 10
    end

    score
  end
end
