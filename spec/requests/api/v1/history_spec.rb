require "rails_helper"

RSpec.describe Api::V1::HistoryController, type: :request do

  Conversation.destroy_all
  ReservableConversation.destroy_all
  CancelledConversation.destroy_all
  ConversationRequest.destroy_all
  User.destroy_all

  let(:user) { create :teacher, organization_device_id: nil }

  describe "GET /api/v1/history.json" do
    context "when any favorite exists" do
      before(:each) do
        student = create(:student, level: Student::LEVEL_N1, organization_device_id: nil)

        13.times do |i|
          service1 = ConversationCreateService.new(user)
          service1.validate = false
          service1.create(i.days.ago, i.days.ago + 25.minutes)

          service2 = ConversationReserveService.new
          service2.validate = false
          service2.reserve_by_reservable_conversation(student, service1.conversation.reservable_conversations.first)
          service1.conversation.status = Conversation::STATUS_COMPLETED
          service1.conversation.save!
        end

        get "/api/v1/history.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "アクセスユーザーの会話履歴を取得します。この中にはブロック中のユーザーは含みません。", autodoc: true do
        expect(json["data"].count).to eq 10

        expect(json["meta"]["current_page"]).to eq 1
        expect(json["meta"]["per_page"]).to eq 10
        expect(json["meta"]["previous_page"]).to eq nil
        expect(json["meta"]["next_page"]).to eq 2
        expect(json["meta"]["total_pages"]).to eq 2
        expect(json["meta"]["total_entries"]).to eq 13
      end

      it "アクセスユーザーの会話履歴の2ページ目を取得します。この中にはブロック中のユーザーは含みません。" do
        get "/api/v1/history.json", headers: {
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

      it "アクセスユーザーの会話履歴の1件だけを取得します。この中にはブロック中のユーザーは含みません。" do
        get "/api/v1/history.json", headers: {
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

      it { expect(response.status).to eq 200 }
    end
  end
end
