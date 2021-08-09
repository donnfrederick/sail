require "rails_helper"

RSpec.describe Api::V1::NotificationsController, type: :request do

  Conversation.destroy_all
  ReservableConversation.destroy_all
  CancelledConversation.destroy_all
  ConversationRequest.destroy_all
  User.destroy_all

  let(:user) { create :teacher, organization_device_id: nil }
  let(:conversation) { create :conversation, teacher: user, start_at: 1.days.since, end_at: 1.days.since + Conversation::DURATION }

  describe "GET /api/v1/notifications.json" do
    context "when notifications exists" do
      before(:each) do
        # published notification
        13.times do |i|
          create :notification, conversation: conversation, scope: Notification::SCOPE_ALL, notificated_at: i.days.ago, sent: true
        end
        # not published notification
        create :notification, conversation: conversation, scope: Notification::SCOPE_ALL, notificated_at: 1.days.since, sent: true

        get "/api/v1/notifications.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "returns some notifications", autodoc: true do
        recently = Notification.user_by(user).published.recently.first

        expect(json["data"].count).to eq 10

        expect(json["data"][0]["id"]).to eq recently.id
        expect(json["data"][0]["image_url"]).to eq recently.image_url
        expect(json["data"][0]["title"]).to eq recently.title
        expect(json["data"][0]["body"]).to eq recently.body
        expect(json["data"][0]["conversation_id"]).to eq recently.conversation_id
        expect(json["data"][0]["notificated_at"]).to eq recently.notificated_at.to_s(:iso8601_tz)
        expect(json["data"][0]["notification_type"]).to eq recently.notification_type
        expect(json["meta"]["current_page"]).to eq 1
        expect(json["meta"]["per_page"]).to eq 10
        expect(json["meta"]["previous_page"]).to eq nil
        expect(json["meta"]["next_page"]).to eq 2
        expect(json["meta"]["total_pages"]).to eq 2
        expect(json["meta"]["total_entries"]).to eq 13
      end

      it "returns 2nd page notifications" do
        get "/api/v1/notifications.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          page: 2,
        }

        expect(json["data"].count).to eq 3

        expect(json["meta"]["current_page"]).to eq 2
        expect(json["meta"]["per_page"]).to eq 10
        expect(json["meta"]["previous_page"]).to eq 1
        expect(json["meta"]["next_page"]).to eq nil
        expect(json["meta"]["total_pages"]).to eq 2
        expect(json["meta"]["total_entries"]).to eq 13
      end

      it "return only one notifications" do
        get "/api/v1/notifications.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          per_page: 1,
        }

        expect(json["data"].count).to eq 1

        expect(json["meta"]["current_page"]).to eq 1
        expect(json["meta"]["per_page"]).to eq 1
        expect(json["meta"]["previous_page"]).to eq nil
        expect(json["meta"]["next_page"]).to eq 2
        expect(json["meta"]["total_pages"]).to eq 13
        expect(json["meta"]["total_entries"]).to eq 13
      end

      it "returns unread count" do
        travel +2.day

        get "/api/v1/teachers/me.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }

        expect(json["unread_count"]).to eq 1
      end

      it "returns unread count 0" do
        get "/api/v1/teachers/me.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }

        expect(json["unread_count"]).to eq 0
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "GET /api/v1/notifications/:id.json" do
    context "when notification exists" do
      let(:notification) do
        create(
          :notification,
          conversation: conversation,
          user_id: user.id,
          scope: Notification::SCOPE_INDIVIDUAL,
          sent: true,
        )
      end

      before(:each) do
        # Reset user's last_readed_at
        user.last_readed_at_value = nil
        get "/api/v1/notifications/#{notification.id}.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "returns the resosurce", autodoc: true do
        expect(json["id"]).to eq notification.id
        expect(json["title"]).to eq notification.title
        expect(json["body"]).to eq notification.body
        expect(json["image_url"]).to eq notification.image_url
        expect(json["conversation_id"]).to eq notification.conversation_id
        expect(json["notificated_at"]).to eq notification.notificated_at.to_s(:iso8601_tz)
        expect(json["notification_type"]).to eq notification.notification_type
      end

      it { expect(response.status).to eq 200 }
    end

    context "when not published" do
      let(:notification) { create :notification, conversation: conversation, notificated_at: 1.day.since, sent: true }

      before(:each) do
        # Reset user's last_readed_at
        user.last_readed_at_value = nil
        get "/api/v1/notifications/#{notification.id}.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it { expect(response.status).to eq 404 }
    end
  end

  describe "GET /api/v1/notifications/stats.json" do
    context "when notifications exists" do
      before(:each) do
        # Reset user's last_readed_at
        user.last_readed_at_value = nil
        # published notification
        13.times do |i|
          create :notification, conversation: conversation, scope: Notification::SCOPE_ALL, notificated_at: i.days.ago, sent: true
        end
        # not published notification
        create :notification, conversation: conversation, scope: Notification::SCOPE_ALL, notificated_at: 1.days.since, sent: true

        get "/api/v1/notifications/stats.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "returns unread count", autodoc: true do
        expect(json["unread_count"]).to eq 7
      end

      it { expect(response.status).to eq 200 }
    end
  end
end
