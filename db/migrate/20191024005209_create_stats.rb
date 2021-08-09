class CreateStats < ActiveRecord::Migration[5.2]
  def change
    create_table :stats do |t|
      t.string :name, null: false, limit: 191, index: true
      t.integer :nth, null: false
      t.datetime :start_at
      t.string :term, null: false, limit: 191, index: true
      t.integer :duration
      t.text :data, null: false
      t.string :digest, null: false, limit: 191, index: true
      t.timestamps
    end

    add_index :stats, [:name, :nth], unique: true
  end

  def data
    admin_user = AdminUser.first
    dict = {
      "i18n.ja.analytics.sections_conversations": "施設ごとの会話数",
      "i18n.en.analytics.sections_conversations": "NH conversations",
      "i18n.ja.analytics.student_registrants": "学生の登録者数",
      "i18n.en.analytics.student_registrants": "Student registrants",
      "i18n.ja.analytics.teacher_registrants": "日本人の登録者数",
      "i18n.en.analytics.teacher_registrants": "Teacher registrants",
      "i18n.ja.analytics.conversation_schedules": "会話日時",
      "i18n.en.analytics.conversation_schedules": "Conversation schedules",
      "i18n.ja.analytics.conversation_creations": "予約作成数",
      "i18n.en.analytics.conversation_creations": "Conversation creations",
      "i18n.ja.analytics.successful_conversations": "会話成功数",
      "i18n.en.analytics.successful_conversations": "Successful conversations",
      "i18n.ja.analytics.failure_conversations": "会話失敗数",
      "i18n.en.analytics.failure_conversations": "Failure conversations",
      "i18n.ja.analytics.unmatched_conversations": "会話未マッチ数",
      "i18n.en.analytics.unmatched_conversations": "Unmatched conversations",
    }
    dict.map do |keyword, content|
      SiteConfig.create(admin_user: admin_user, keyword: keyword, content: content)
    end
  end
end
