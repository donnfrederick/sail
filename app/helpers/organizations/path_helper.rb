module Organizations
  module PathHelper
    def org_path(role_type = nil)
      if role_type.present?
        "/organizations/#{role_type}/"
      else
        "/organizations/"
      end
    end

    def org_signin_path
      "/organizations/create"
    end

    def org_signout_path
      "/organizations/signout"
    end

    def student_password_reset
      "/students/password_reset"
    end

    def teacher_password_reset
      "/teachers/password_reset"
    end

    def student_mypage_path
      "/students/mypage"
    end

    def org_student_signin_path
      "/organizations/users/sessions"
    end

    def org_invitation_accept_path(digest)
      "/organizations/invitees/#{digest}/accept"
    end

    def org_conversations_calendar_path(role_type, dimension_id, month = nil)
      if month.present?
        "/organizations/#{role_type}/conversations/calendar/#{dimension_id}?month=#{month}"
      else
        "/organizations/#{role_type}/conversations/calendar/#{dimension_id}"
      end
    end

    def org_conversations_table_path(role_type, dimension_id, month = nil)
      if month.present?
        "/organizations/#{role_type}/conversations/table/#{dimension_id}?month=#{month}"
      else
        "/organizations/#{role_type}/conversations/table/#{dimension_id}"
      end
    end

    def org_conversations_path(role_type)
      "/organizations/#{role_type}/conversations"
    end

    def org_conversation_create_path(role_type)
      "/organizations/#{role_type}/conversations/create"
    end

    def org_conversation_show_path(role_type, conversation_id, user_id)
      "/organizations/#{role_type}/conversations/show/#{conversation_id}/#{user_id}"
    end

    def org_conversation_before_create_path(role_type, params_ = nil)
      if params_.present?
        "/organizations/#{role_type}/conversations/confirm_before_create?" + params_.to_query
      else
        "/organizations/#{role_type}/conversations/confirm_before_create"
      end
    end

    def org_conversation_before_reserve_path(role_type, reservable_conversation_id, user_id, dimension_id, start_at)
      "/organizations/#{role_type}/conversations/confirm_before_reserve/#{reservable_conversation_id}/#{user_id}/#{dimension_id}/#{start_at}"
    end

    def org_conversation_reserve_path(role_type, dimension_id)
      "/organizations/#{role_type}/conversations/reserve/#{dimension_id}"
    end

    def org_conversation_before_destroy(role_type, conversation_id, user_id, dimension_id = nil)
      if dimension_id.present?
        "/organizations/#{role_type}/conversations/confirm_before_delete/#{conversation_id}/#{user_id}/0/#{dimension_id}"
      else
        "/organizations/#{role_type}/conversations/confirm_before_delete/#{conversation_id}/#{user_id}/0"
      end
    end

    def org_history_path(role_type, dimension_id = nil)
      if dimension_id.present?
        "/organizations/#{role_type}/history/list/#{dimension_id}"
      else
        "/organizations/#{role_type}/history/list/"
      end
    end

    def org_video_play_path(role_type, conversation_id)
      "/organizations/#{role_type}/videos/play/#{conversation_id}"
    end

    def org_notification_list_path(role_type)
      "/organizations/#{role_type}/notifications/"
    end

    def org_notification_new_path(role_type)
      "/organizations/#{role_type}/notifications/new"
    end

    def org_notification_create_path(role_type)
      "/organizations/#{role_type}/notifications"
    end

    def org_notification_show_path(role_type, notification_id)
      "/organizations/#{role_type}/notifications/#{notification_id}"
    end

    def org_notification_publish_path(role_type)
      "/organizations/#{role_type}/notifications/publish"
    end

    def org_notification_edit_path(role_type, notification_id)
      "/organizations/#{role_type}/notifications/#{notification_id}/edit/"
    end

    def org_notification_update_path(role_type, notification_id)
      "/organizations/#{role_type}/notifications/#{notification_id}/edit/"
    end

    def org_notification_confirm_publish_path(role_type, notification_id)
      "/organizations/#{role_type}/notifications/#{notification_id}/confirm_before_publish"
    end

    def org_notification_unpublish_path(role_type)
      "/organizations/#{role_type}/notifications/unpublish"
    end

    def org_notification_confirm_unpublish_path(role_type, notification_id)
      "/organizations/#{role_type}/notifications/#{notification_id}/confirm_before_unpublish"
    end

    def org_notification_confirm_destroy_path(role_type, notification_id)
      "/organizations/#{role_type}/notifications/#{notification_id}/confirm_before_delete"
    end

    def org_notification_destroy_path(role_type, notification_id)
      "/organizations/#{role_type}/notifications/#{notification_id}"
    end

    def tablets_path(role_type)
      "/organizations/#{role_type}/tablets"
    end

    def tablets_show_path(role_type, device_id)
      tablets_edit_path(role_type, device_id)
    end

    def tablets_edit_path(role_type, device_id)
      "/organizations/#{role_type}/tablets/#{device_id}/edit"
    end

    def org_user_new_path(role_type, dimension_id = nil)
      if dimension_id.present?
        "/organizations/#{role_type}/users/new/#{dimension_id}"
      else
        "/organizations/#{role_type}/users/new"
      end
    end

    def org_user_list_path(role_type, dimension_id = nil)
      if dimension_id.present?
        "/organizations/#{role_type}/users/list/#{dimension_id}"
      else
        "/organizations/#{role_type}/users/list"
      end
    end

    def org_user_show_path(role_type, user_id)
      "/organizations/#{role_type}/users/#{user_id}"
    end

    def org_user_edit_path(role_type, user_id)
      "/organizations/#{role_type}/users/#{user_id}/edit"
    end

    def org_user_update_path(role_type, user_id)
      "/organizations/#{role_type}/users/#{user_id}/edit"
    end

    def org_user_destroy_path(role_type, user_id)
      "/organizations/#{role_type}/users/#{user_id}"
    end

    def org_user_confirm_destroy_path(role_type, user_id)
      "/organizations/#{role_type}/users/confirm_to_delete/#{user_id}"
    end

    def org_picture_new_path
      "/organizations/picture/new"
    end

    def org_picture_create_path
      "/organizations/picture"
    end

    def org_picture_show_path
      "/organizations/picture/"
    end

    def org_picture_confirm_destroy_path
      "/organizations/picture/confirm_to_delete"
    end

    def org_picture_destroy_path
      "/organizations/picture"
    end

    def org_recovery_path
      "/organizations/recovery"
    end

    def org_recovery_create_path
      "/organizations/recovery/create"
    end

    def org_recovery_update_path(digest)
      "/organizations/recovery/#{digest}"
    end

    def org_invitation_path(role_type)
      "/organizations/#{role_type}/invitations/"
    end

    def org_invitation_signin_path(digest)
      "/organizations/invitees/#{digest}"
    end

    def org_invitation_new_path(role_type)
      "/organizations/#{role_type}/invitations/new"
    end

    def org_invitation_create_path(role_type)
      "/organizations/#{role_type}/invitations"
    end

    def org_invitation_confirm_destroy_path(role_type, digest)
      "/organizations/#{role_type}/invitations/confirm_to_delete/#{digest}"
    end

    def org_invitation_destroy_path(role_type, digest)
      "/organizations/#{role_type}/invitations/#{digest}"
    end

    def org_invitation_confirm_accept_path(digest)
      "/organizations/invitees/#{digest}/confirm"
    end

    def org_account_list_path(role_type)
      "/organizations/#{role_type}/accounts"
    end

    def org_tablet_list_path(role_type)
      "/organizations/#{role_type}/tablets/"
    end

    def org_switch_path(role_type, section_id, path = nil)
      if path.present?
        "/organizations/#{role_type}/sections/#{section_id}?url=#{path}"
      else
        "/organizations/#{role_type}/sections/#{section_id}"
      end
    end

    def org_error_no_contract(type)
      "/organizations/errors/no_contract_#{type}"
    end

    def org_preference_email_path
      "/organizations/preferences/email"
    end

    def org_preference_email_edit_path
      "/organizations/preferences/email/edit"
    end

    def org_preference_email_update_path
      org_preference_email_edit_path
    end

    def org_preference_password_edit_path
      "/organizations/preferences/password/edit"
    end

    def org_preference_password_update_path
      org_preference_password_edit_path
    end
  end
end
