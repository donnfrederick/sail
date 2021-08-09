# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_16_014508) do

  create_table "accusations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "conversation_id"
    t.bigint "from_user_id"
    t.bigint "to_user_id"
    t.bigint "accusation_reason_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["accusation_reason_id"], name: "index_accusations_on_accusation_reason_id"
    t.index ["conversation_id"], name: "index_accusations_on_conversation_id"
    t.index ["from_user_id"], name: "index_accusations_on_from_user_id"
    t.index ["to_user_id"], name: "index_accusations_on_to_user_id"
  end

  create_table "active_admin_comments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "namespace", limit: 191
    t.text "body"
    t.string "resource_type", limit: 191
    t.bigint "resource_id"
    t.string "author_type", limit: 191
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "added_tags", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "name_jp"
    t.integer "category_id"
    t.string "name_en"
    t.string "name_indo"
    t.string "name_vietnam"
    t.string "name_china"
    t.string "name_taiwan"
    t.string "name_taly"
    t.string "name_spain"
    t.string "name_france"
  end

  create_table "admin_users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "provider", limit: 191
    t.string "email", limit: 191
    t.string "role", limit: 191
    t.string "last_sign_in_ip", limit: 191
    t.datetime "last_sign_in_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid", limit: 191
    t.string "lang", limit: 3, default: "ja"
    t.string "timezone", limit: 191, default: "Asia/Tokyo"
    t.index ["provider", "uid"], name: "index_admin_users_on_provider_and_uid", unique: true
  end

  create_table "ambush_conversations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "conversation_id"
    t.datetime "start_at"
    t.datetime "end_at"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["conversation_id"], name: "index_ambush_conversations_on_conversation_id"
    t.index ["end_at"], name: "index_ambush_conversations_on_end_at"
    t.index ["start_at"], name: "index_ambush_conversations_on_start_at"
    t.index ["user_id"], name: "index_ambush_conversations_on_user_id"
  end

  create_table "blocks", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "from_user_id"
    t.bigint "to_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["from_user_id"], name: "index_blocks_on_from_user_id"
    t.index ["to_user_id"], name: "index_blocks_on_to_user_id"
  end

  create_table "cancelled_conversations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.integer "conversation_id"
    t.bigint "teacher_id"
    t.bigint "student_id"
    t.string "reason", limit: 191
    t.datetime "start_at"
    t.datetime "end_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "original_created_at"
    t.datetime "original_matched_at"
    t.index ["end_at"], name: "index_cancelled_conversations_on_end_at"
    t.index ["reason"], name: "index_cancelled_conversations_on_reason"
    t.index ["start_at"], name: "index_cancelled_conversations_on_start_at"
    t.index ["student_id"], name: "index_cancelled_conversations_on_student_id"
    t.index ["teacher_id"], name: "index_cancelled_conversations_on_teacher_id"
  end

  create_table "categories", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "name_jp"
    t.string "name_en"
    t.string "name_indo"
    t.string "name_vietnam"
    t.string "name_china"
    t.string "name_taiwan"
    t.string "name_taly"
    t.string "name_spain"
    t.string "name_france"
    t.integer "delete_flg"
    t.string "color"
  end

  create_table "chats", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "conversation_id"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["conversation_id"], name: "index_chats_on_conversation_id"
    t.index ["user_id"], name: "index_chats_on_user_id"
  end

  create_table "client_logs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "slug", limit: 191
    t.text "data", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_client_logs_on_slug"
    t.index ["user_id"], name: "index_client_logs_on_user_id"
  end

  create_table "connection_statuses", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "conversation_id"
    t.string "client_id", null: false
    t.integer "minutes", default: 0
    t.string "media", null: false
    t.datetime "requested_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["conversation_id"], name: "index_connection_statuses_on_conversation_id"
  end

  create_table "conversation_packages", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "name"
    t.bigint "member_property_id"
    t.bigint "silver_property_id"
    t.bigint "gold_property_id"
    t.bigint "platinum_property_id"
    t.index ["gold_property_id"], name: "index_conversation_packages_on_gold_property_id"
    t.index ["member_property_id"], name: "index_conversation_packages_on_member_property_id"
    t.index ["platinum_property_id"], name: "index_conversation_packages_on_platinum_property_id"
    t.index ["silver_property_id"], name: "index_conversation_packages_on_silver_property_id"
  end

  create_table "conversation_requests", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "from_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "conversation_id"
    t.datetime "start_at"
    t.datetime "end_at"
    t.boolean "approved", default: false
    t.boolean "rejected", default: false
    t.index ["conversation_id", "from_user_id"], name: "users_conversation_request_unique_index", unique: true
    t.index ["conversation_id"], name: "index_conversation_requests_on_conversation_id"
    t.index ["from_user_id"], name: "index_conversation_requests_on_from_user_id"
  end

  create_table "conversations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "conversation_request_id"
    t.bigint "admin_user_id"
    t.string "status", limit: 191, null: false
    t.datetime "start_at"
    t.datetime "end_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "channel_id", limit: 191
    t.string "video", limit: 191
    t.string "compilation_status", limit: 191
    t.boolean "accepting_requests", default: false
    t.bigint "teacher_id"
    t.boolean "teacher_rated", default: false
    t.integer "teacher_evaluation_fun"
    t.integer "teacher_evaluation_ability"
    t.integer "teacher_evaluation_time"
    t.integer "teacher_evaluation_sum"
    t.boolean "teacher_video_unstable", default: false
    t.boolean "teacher_video_invisible", default: false
    t.boolean "teacher_environment_loud", default: false
    t.boolean "teacher_sound_unstable", default: false
    t.text "teacher_memo"
    t.string "teacher_report"
    t.boolean "teacher_report_solicitation", default: false
    t.boolean "teacher_report_spam", default: false
    t.boolean "teacher_report_sexual", default: false
    t.boolean "teacher_report_criminal", default: false
    t.boolean "teacher_report_other", default: false
    t.string "teacher_online_status"
    t.bigint "student_id"
    t.boolean "student_rated", default: false
    t.integer "student_evaluation_fun"
    t.integer "student_evaluation_ability"
    t.integer "student_evaluation_time"
    t.integer "student_evaluation_sum"
    t.boolean "student_video_unstable", default: false
    t.boolean "student_video_invisible", default: false
    t.boolean "student_environment_loud", default: false
    t.boolean "student_sound_unstable", default: false
    t.text "student_memo"
    t.string "student_report"
    t.boolean "student_report_solicitation", default: false
    t.boolean "student_report_spam", default: false
    t.boolean "student_report_sexual", default: false
    t.boolean "student_report_criminal", default: false
    t.boolean "student_report_other", default: false
    t.string "student_online_status"
    t.datetime "matched_at"
    t.string "result_status"
    t.datetime "deleted_at"
    t.index ["admin_user_id"], name: "index_conversations_on_admin_user_id"
    t.index ["channel_id"], name: "index_conversations_on_channel_id", unique: true
    t.index ["conversation_request_id"], name: "index_conversations_on_conversation_request_id"
    t.index ["end_at"], name: "index_conversations_on_end_at"
    t.index ["start_at"], name: "index_conversations_on_start_at"
    t.index ["status"], name: "index_conversations_on_status"
    t.index ["student_id"], name: "index_conversations_on_student_id"
    t.index ["teacher_id"], name: "index_conversations_on_teacher_id"
  end

  create_table "conversations_memos", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "users_conversation_id"
    t.string "memo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["users_conversation_id"], name: "index_conversations_memos_on_users_conversation_id"
  end

  create_table "conversations_report_reasons", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "conversations_report_id"
    t.integer "reason_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["conversations_report_id", "reason_id"], name: "conversations_report_reason_index", unique: true
    t.index ["conversations_report_id"], name: "index_conversations_report_reasons_on_conversations_report_id"
  end

  create_table "conversations_reports", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "conversation_id"
    t.bigint "from_user_id"
    t.bigint "to_user_id"
    t.string "detail", limit: 191
    t.boolean "block_requested", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["conversation_id"], name: "index_conversations_reports_on_conversation_id"
    t.index ["from_user_id"], name: "index_conversations_reports_on_from_user_id"
    t.index ["to_user_id"], name: "index_conversations_reports_on_to_user_id"
  end

  create_table "coupon_owners", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "encrypted_email", limit: 191
    t.boolean "used", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "coupon_id"
    t.index ["coupon_id"], name: "index_coupon_owners_on_coupon_id"
    t.index ["user_id"], name: "index_coupon_owners_on_user_id"
  end

  create_table "coupons", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name", limit: 191
    t.string "code", limit: 191, null: false
    t.datetime "expired_at"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "coupons_code_unique", unique: true
    t.index ["name"], name: "index_coupons_on_name"
    t.index ["user_id"], name: "index_coupons_on_user_id"
  end

  create_table "coupons_issues", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "users_coupon_id"
    t.bigint "issue_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["issue_id"], name: "index_coupons_issues_on_issue_id"
    t.index ["users_coupon_id", "issue_id"], name: "coupons_issue_unique", unique: true
    t.index ["users_coupon_id"], name: "index_coupons_issues_on_users_coupon_id"
  end

  create_table "coupons_pricing_tables", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "coupon_id"
    t.bigint "pricing_table_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coupon_id"], name: "index_coupons_pricing_tables_on_coupon_id"
    t.index ["pricing_table_id"], name: "index_coupons_pricing_tables_on_pricing_table_id"
  end

  create_table "evaluations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "users_conversation_id"
    t.integer "fun", default: 0
    t.integer "ability", default: 0
    t.integer "time", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["users_conversation_id"], name: "index_evaluations_on_users_conversation_id"
  end

  create_table "favorites", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "from_user_id"
    t.bigint "to_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["from_user_id", "to_user_id"], name: "favorite_unique_index", unique: true
    t.index ["from_user_id"], name: "index_favorites_on_from_user_id"
    t.index ["to_user_id"], name: "index_favorites_on_to_user_id"
  end

  create_table "gateway_plans", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "package_property_id"
    t.string "gateway", limit: 191, null: false
    t.string "data_id", limit: 191
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "gateway_product_id"
    t.index ["gateway"], name: "index_gateway_plans_on_gateway"
    t.index ["gateway_product_id"], name: "index_gateway_plans_on_gateway_product_id"
    t.index ["package_property_id"], name: "index_gateway_plans_on_package_property_id"
  end

  create_table "gateway_products", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "package_property_id"
    t.string "gateway", limit: 191, null: false
    t.string "data_id", limit: 191
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["gateway"], name: "index_gateway_products_on_gateway"
    t.index ["package_property_id"], name: "index_gateway_products_on_package_property_id"
  end

  create_table "grades", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "type", limit: 191
    t.integer "min_conversation_count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "max_absence_percentage", default: 0
    t.integer "max_lateness_percentage", default: 0
    t.integer "max_negative_feedback_percentage", default: 0
    t.integer "max_discommunication_percentage", default: 0
    t.integer "max_no_video_percentage", default: 0
    t.integer "max_noisy_place_percentage", default: 0
    t.integer "step", default: 1
    t.index ["type"], name: "index_grades_on_type"
  end

  create_table "hobbies", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "scope", limit: 191
    t.string "name_ja", limit: 191
    t.string "name_en", limit: 191
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["scope"], name: "index_hobbies_on_scope"
  end

  create_table "invitations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "organization_section_id"
    t.bigint "organization_staff_id"
    t.string "token", limit: 191
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_section_id"], name: "index_invitations_on_organization_section_id"
    t.index ["organization_staff_id"], name: "index_invitations_on_organization_staff_id"
  end

  create_table "issues", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "type", limit: 191
    t.string "failure_code"
    t.string "failure_message"
    t.boolean "succeeded"
    t.string "data_id", limit: 191
    t.integer "conversations", default: 0
    t.datetime "expired_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "paid_amount", default: "0"
    t.boolean "prerogative", default: false
    t.string "status"
    t.index ["data_id"], name: "index_issues_on_data_id"
    t.index ["type"], name: "index_issues_on_type"
    t.index ["user_id"], name: "index_issues_on_user_id"
  end

  create_table "materials", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "admin_user_id"
    t.string "name", limit: 191, null: false
    t.text "url", null: false
    t.integer "views", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_user_id"], name: "index_materials_on_admin_user_id"
  end

  create_table "notifications", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "admin_user_id"
    t.datetime "notificated_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.string "scope", limit: 191
    t.string "title_ja", limit: 191
    t.string "title_en", limit: 191
    t.text "body_ja"
    t.text "body_en"
    t.integer "organization_staff_id"
    t.bigint "conversation_id"
    t.integer "notification_type", default: 0
    t.datetime "deleted_at"
    t.boolean "sent", default: false
    t.bigint "related_user_id"
    t.string "template", limit: 191
    t.index ["admin_user_id"], name: "index_notifications_on_admin_user_id"
    t.index ["related_user_id"], name: "index_notifications_on_related_user_id"
  end

  create_table "organization_agents", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "organization_staff_id"
    t.integer "privilege", default: 0
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_staff_id"], name: "index_organization_agents_on_organization_staff_id"
  end

  create_table "organization_agents_staffs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "organization_agent_id"
    t.bigint "organization_staff_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_agent_id"], name: "index_organization_agents_staffs_on_organization_agent_id"
    t.index ["organization_staff_id"], name: "index_organization_agents_staffs_on_organization_staff_id"
  end

  create_table "organization_devices", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "organization_staff_id"
    t.string "name", limit: 191
    t.string "model_number", limit: 191
    t.string "property_management_number", limit: 191
    t.datetime "checkout_at"
    t.datetime "return_at"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_staff_id"], name: "index_organization_devices_on_organization_staff_id"
  end

  create_table "organization_sections", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "organization_id"
    t.string "name_ja", limit: 191
    t.string "name_en", limit: 191
    t.boolean "tutoring", default: false
    t.boolean "statistics", default: true
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_organization_sections_on_organization_id"
  end

  create_table "organization_staffs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "organization_section_id"
    t.string "official_position", limit: 191
    t.string "username", limit: 191
    t.string "auth_token", limit: 191
    t.string "fcm_token", limit: 191
    t.string "encrypted_email", limit: 191, null: false
    t.string "password_digest", limit: 191, null: false
    t.string "encrypted_phone_number", limit: 191
    t.string "password_reset_digest", limit: 191
    t.datetime "password_reset_sent_at"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["auth_token"], name: "index_organization_staffs_on_auth_token"
    t.index ["encrypted_email"], name: "index_organization_staffs_on_encrypted_email"
    t.index ["organization_section_id"], name: "index_organization_staffs_on_organization_section_id"
  end

  create_table "organizations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "industry", limit: 191, null: false
    t.string "country", limit: 191
    t.string "name_ja", limit: 191
    t.string "name_en", limit: 191
    t.string "name_kana", limit: 191
    t.string "local_address", limit: 191
    t.string "phone_number", limit: 191
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "picture", limit: 191
    t.boolean "statistics", default: true
  end

  create_table "package_properties", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "original_price", default: "0", null: false
    t.string "discounted_price"
    t.string "currency", default: "usd", null: false
    t.integer "duration", default: 1
    t.integer "original_conversations", default: 0, null: false
    t.integer "bonus_conversations", default: 0, null: false
    t.datetime "expired_at"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "term", default: "month"
  end

  create_table "packages", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "type", limit: 191
    t.string "name", limit: 191
    t.string "original_price"
    t.string "discounted_price", default: "-1"
    t.string "currency"
    t.integer "duration"
    t.integer "original_conversations"
    t.integer "bonus_conversations", default: -1
    t.boolean "recommended", default: false
    t.string "description"
    t.datetime "expired_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["type"], name: "index_packages_on_type"
  end

  create_table "pairs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "from_user_id"
    t.bigint "to_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "manual", default: true
    t.boolean "follow_up", default: false
    t.index ["from_user_id"], name: "index_pairs_on_from_user_id"
    t.index ["to_user_id"], name: "index_pairs_on_to_user_id"
  end

  create_table "phone_authentications", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "country", limit: 191, null: false
    t.string "code", limit: 191, null: false
    t.boolean "activated", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_phone_number", limit: 191, null: false
    t.index ["country"], name: "index_phone_authentications_on_country"
  end

  create_table "point_transactions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "issue_id"
    t.bigint "conversation_id"
    t.string "type", limit: 191
    t.integer "points", default: 1
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "conversation_request_id"
    t.bigint "consumed_point_transaction_id"
    t.index ["consumed_point_transaction_id"], name: "index_point_transactions_on_consumed_point_transaction_id"
    t.index ["conversation_id"], name: "index_point_transactions_on_conversation_id"
    t.index ["conversation_request_id"], name: "index_point_transactions_on_conversation_request_id"
    t.index ["issue_id"], name: "index_point_transactions_on_issue_id"
    t.index ["type"], name: "index_point_transactions_on_type"
  end

  create_table "pricing_tables", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "admin_user_id"
    t.string "name", null: false
    t.string "package_1_name", null: false
    t.string "package_2_name", null: false
    t.string "package_3_name", null: false
    t.string "package_4_name", null: false
    t.string "package_5_name", null: false
    t.string "package_6_name", null: false
    t.bigint "package_1_id", null: false
    t.bigint "package_2_id", null: false
    t.bigint "package_3_id", null: false
    t.bigint "package_4_id", null: false
    t.bigint "package_5_id", null: false
    t.bigint "package_6_id", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_user_id"], name: "index_pricing_tables_on_admin_user_id"
    t.index ["package_1_id"], name: "index_pricing_tables_on_package_1_id"
    t.index ["package_2_id"], name: "index_pricing_tables_on_package_2_id"
    t.index ["package_3_id"], name: "index_pricing_tables_on_package_3_id"
    t.index ["package_4_id"], name: "index_pricing_tables_on_package_4_id"
    t.index ["package_5_id"], name: "index_pricing_tables_on_package_5_id"
    t.index ["package_6_id"], name: "index_pricing_tables_on_package_6_id"
  end

  create_table "purposes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "scope", limit: 191
    t.string "name_ja", limit: 191
    t.string "name_en", limit: 191
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["scope"], name: "index_purposes_on_scope"
  end

  create_table "quality_evaluations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "evaluation_id"
    t.integer "quality_id", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["evaluation_id", "quality_id"], name: "index_quality_evaluations_on_evaluation_id_and_quality_id", unique: true
    t.index ["evaluation_id"], name: "index_quality_evaluations_on_evaluation_id"
  end

  create_table "reports", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "term", limit: 191
    t.date "recorded_on"
    t.string "kind", limit: 191
    t.integer "count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reservable_conversations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "conversation_id"
    t.datetime "start_at"
    t.datetime "end_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["conversation_id"], name: "index_reservable_conversations_on_conversation_id"
    t.index ["end_at"], name: "index_reservable_conversations_on_end_at"
    t.index ["start_at"], name: "index_reservable_conversations_on_start_at"
    t.index ["user_id"], name: "index_reservable_conversations_on_user_id"
  end

  create_table "selected_tags", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "user_email"
    t.integer "tag_id"
    t.string "tag_name"
    t.integer "delete_flg"
  end

  create_table "site_configs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "admin_user_id"
    t.string "keyword", limit: 191
    t.integer "format"
    t.text "content"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_user_id"], name: "index_site_configs_on_admin_user_id"
  end

  create_table "stats", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "name", limit: 191, null: false
    t.integer "nth", null: false
    t.datetime "start_at"
    t.string "term", limit: 191, null: false
    t.integer "duration"
    t.text "data", null: false
    t.string "digest", limit: 191, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["digest"], name: "index_stats_on_digest"
    t.index ["name", "nth"], name: "index_stats_on_name_and_nth", unique: true
    t.index ["name"], name: "index_stats_on_name"
    t.index ["term"], name: "index_stats_on_term"
  end

  create_table "tags", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.string "name_jp"
    t.integer "category_id"
    t.string "name_en"
    t.string "name_indo"
    t.string "name_vietnam"
    t.string "name_china"
    t.string "name_taiwan"
    t.string "name_taly"
    t.string "name_spain"
    t.string "name_france"
  end

  create_table "user_accesses", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "fullpath", limit: 191
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "user_agent"
    t.index ["user_id"], name: "index_user_accesses_on_user_id"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "organization_device_id"
    t.string "type", limit: 191
    t.string "provider", limit: 191
    t.string "encrypted_uid", limit: 191
    t.string "auth_token", limit: 191
    t.string "username", limit: 191
    t.string "name_ja", limit: 191
    t.string "name_en", limit: 191
    t.integer "sex", default: 0
    t.string "picture", limit: 191
    t.string "country", limit: 191
    t.string "timezone", limit: 191
    t.string "encrypted_email", limit: 191
    t.string "password_digest", limit: 191
    t.string "encrypted_birthday", limit: 191
    t.string "activation_digest", limit: 191
    t.integer "level"
    t.integer "desired_condition"
    t.string "web_socket_token", limit: 191
    t.boolean "is_activated"
    t.datetime "activated_at"
    t.datetime "activation_sent_at"
    t.string "password_reset_digest", limit: 191
    t.datetime "password_reset_sent_at"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "lateness", default: 0, null: false
    t.string "fcm_token", limit: 191
    t.integer "conversation_level", default: 0
    t.integer "evaluation_very_funny", default: 0
    t.integer "evaluation_lovely", default: 0
    t.integer "evaluation_amazing", default: 0
    t.integer "evaluation_fine", default: 0
    t.integer "evaluation_uncomfortable", default: 0
    t.float "evaluation_score", default: 0.0
    t.integer "absence", default: 0
    t.integer "rated_conversation_level", default: 0
    t.boolean "highly_reliable", default: false
    t.boolean "suspicious", default: false
    t.boolean "invalid_as_foreigner", default: false
    t.boolean "invalid_as_ridiculous", default: false
    t.string "encrypted_phone_number", limit: 191
    t.boolean "statistics", default: true
    t.text "introduce"
    t.index ["auth_token"], name: "index_users_on_auth_token", unique: true
    t.index ["encrypted_email"], name: "index_users_on_encrypted_email", unique: true
    t.index ["encrypted_phone_number"], name: "users_phone_number_uniq", unique: true
    t.index ["fcm_token"], name: "index_users_on_fcm_token", unique: true
    t.index ["organization_device_id"], name: "index_users_on_organization_device_id"
    t.index ["type"], name: "index_users_on_type"
    t.index ["web_socket_token"], name: "index_users_on_web_socket_token", unique: true
  end

  create_table "users_conversations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "conversation_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "onlined", default: false, null: false
    t.boolean "is_late", default: false, null: false
    t.index ["conversation_id"], name: "index_users_conversations_on_conversation_id"
    t.index ["user_id"], name: "index_users_conversations_on_user_id"
  end

  create_table "users_coupons", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "coupon_id"
    t.integer "usages", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coupon_id"], name: "index_users_coupons_on_coupon_id"
    t.index ["user_id", "coupon_id"], name: "users_coupon_unique", unique: true
    t.index ["user_id"], name: "index_users_coupons_on_user_id"
  end

  create_table "users_grades", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "grade_id"
    t.integer "conversation_count", default: 0
    t.datetime "assigned_at"
    t.datetime "aggregated_at"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "feedback_count", default: 0
    t.integer "absence_count", default: 0
    t.integer "lateness_count", default: 0
    t.integer "negative_feedback_count", default: 0
    t.integer "discommunication_count", default: 0
    t.integer "no_video_count", default: 0
    t.integer "noisy_place_count", default: 0
    t.index ["grade_id"], name: "index_users_grades_on_grade_id"
    t.index ["user_id"], name: "index_users_grades_on_user_id"
  end

  create_table "users_hobbies", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "hobby_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hobby_id"], name: "index_users_hobbies_on_hobby_id"
    t.index ["user_id"], name: "index_users_hobbies_on_user_id"
  end

  create_table "users_network_activities", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "type", limit: 191
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["type"], name: "index_users_network_activities_on_type"
    t.index ["user_id"], name: "index_users_network_activities_on_user_id"
  end

  create_table "users_organization_sections", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "organization_section_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_section_id"], name: "index_users_organization_sections_on_organization_section_id"
    t.index ["user_id"], name: "index_users_organization_sections_on_user_id"
  end

  create_table "users_purposes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "purpose_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["purpose_id"], name: "index_users_purposes_on_purpose_id"
    t.index ["user_id"], name: "index_users_purposes_on_user_id"
  end

  create_table "video_chunks", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "conversation_id"
    t.string "file", limit: 191
    t.string "client_id", limit: 191
    t.datetime "start_at"
    t.datetime "end_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "media_type", limit: 191
    t.index ["conversation_id"], name: "index_video_chunks_on_conversation_id"
  end

  add_foreign_key "cancelled_conversations", "users", column: "student_id"
  add_foreign_key "cancelled_conversations", "users", column: "teacher_id"
  add_foreign_key "conversation_requests", "conversations"
  add_foreign_key "coupon_owners", "coupons"
  add_foreign_key "gateway_plans", "gateway_products"
  add_foreign_key "notifications", "users", column: "related_user_id"
end
