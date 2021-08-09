module Organizations
  module CalendarHelper
    def calendar_head_name(start_date, end_date, week)
      if week == 0
        start_date.strftime(I18n.t("organization.calendar.month_header_head")) +
          I18n.t("organization.calendar.month_header_middle") +
          end_date.strftime(I18n.t("organization.calendar.month_header_tail"))
      else
        ""
      end
    end

    def calendar_head_date_attr_class(day)
      if day.present?
        "date week-" + day.wday.to_s + ""
      else
        ""
      end
    end

    def calendar_head_date_attr_colspan(first, last)
      calendar_head_colspan(first, last).to_s
    end

    def calendar_head_date_attr(day, first, last)
      cols = calendar_head_colspan(first, last)
      if day.present?
        a = "class=\"date week-" + day.wday.to_s + "\" colspan=\"" + cols.to_s + "\""
      else
        a = "colspan=\"" + cols.to_s + "\""
      end

      puts a
      "test=true"
    end

    def calendar_head_date_name(day)
      day.strftime("%-m/%-d(%a)")
    end

    def calendar_time_oclock(hours)
      if hours > 9
        hours.to_s + ":00"
      else
        "0" + hours.to_s + ":00"
      end
    end

    def calendar_blank_column(first, last, rows)
      cols = calendar_head_colspan(first, last)
      "colspan=\"" + cols.to_s + "\" rowspan=\"" + rows.to_s + "\""
    end

    def calendar_head_colspan(first, last)
      (last - first + 1) * 2
    end

    def calendar_available?(participant, section_schedule, time)
      future = time - Time.zone.now > 0
      schedule = participant.present? ? section_schedule.schedule_of(participant) : nil
      if schedule.present?
        if schedule.opening_at?(time)
          future
        elsif schedule.matched_at?(time)
          true
        else
          future
        end
      else
        false
      end
    end

    def calendar_column_attr_class(participant, section_schedule, dimension, time)
      available = calendar_available?(participant, section_schedule, time)
      schedule = participant.present? ? section_schedule.schedule_of(participant) : nil
      if schedule.present?
        if schedule.opening_at?(time)
          "time conversation open" + (available ? "" : " disabled")
        elsif schedule.matched_at?(time)
          "time conversation matched"
        else
          "time" + (available ? "" : " disabled")
        end
      else
        "time empty disabled"
      end
    end

    def calendar_column_attr_onclick(role_type, participant, section_schedule, dimension, time)
      available = calendar_available?(participant, section_schedule, time)
      schedule = participant.present? ? section_schedule.schedule_of(participant) : nil
      if schedule.present?
        if schedule.opening_at?(time)
          if available
            "location.href='" + calendar_url_destroy(role_type, schedule, dimension, time) + "'; return false;"
          else
            "return false;"
          end
        elsif schedule.matched_at?(time)
          "location.href='" + calendar_url_show(role_type, schedule, time) + "'; return false;"
        else
          if available
            "location.href='" + calendar_url_create(role_type, schedule, dimension, time) + "'; return false;"
          else
            "return false;"
          end
        end
      else
        "return false;"
      end
    end

    def calendar_column_attr(role_type, participant, section_schedule, dimension, time)
      schedule = participant.present? ? section_schedule.schedule_of(participant) : nil
      if schedule.present?
        if schedule.opening_at?(time)
          "class=\"time conversation open\" onclick=\"location.href='" + calendar_url_show(role_type, schedule, time) + "'; return false;\""
        elsif schedule.matched_at?(time)
          "class=\"time conversation matched\" onclick=\"location.href='" + calendar_url_show(role_type, schedule, time) + "'; return false;\""
        else
          "class=\"time\" onclick=\"location.href='" + calendar_url_create(role_type, schedule, dimension, time) + "'; return false;\""
        end
      else
        "class=\"time empt"
      end
    end

    def calendar_url_create(role_type, schedule, dimension, time)
      "/organizations/#{role_type}/conversations/new/#{dimension.id}/#{schedule.owener.id}/#{time.to_s}"
    end

    def calendar_url_destroy(role_type, schedule, dimension, time)
      conversation = schedule.conversation_at(time)
      is_ambush = conversation.is_a?(AmbushConversation)
      calendar_url_destroy_by_user(role_type, schedule.owener, conversation.id, dimension, is_ambush)
    end

    def calendar_url_show(role_type, schedule, time)
      calendar_url_show_by_ids(role_type, schedule.conversation_at(time).id, schedule.owener.id)
    end

    def calendar_url_show_by_ids(role_type, conversation_id, user_id)
      "/organizations/#{role_type}/conversations/show/#{conversation_id}/#{user_id}"
    end

    def calendar_url_destroy_by_user(role_type, user, conversation_id, dimension, is_ambush)
      url = "/organizations/#{role_type}/conversations/confirm_before_delete/#{conversation_id}/#{user.id}/#{is_ambush ? 1 : 0}"
      url + "/#{dimension.id}" if dimension.present?
      url
    end

    def calendar_url_destroy_by_ids(role_type, conversation_id, user_id, dimension_id, is_ambush)
      "/organizations/#{role_type}/conversations/destroy/#{conversation_id}/#{user_id}/#{is_ambush ? 1 : 0}/#{dimension_id}"
    end
  end
end
