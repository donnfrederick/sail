require "rails_helper"

RSpec.describe Api::V1::ConversationRequestsController, type: :request do
  around do |e|
    travel_to("2018-01-01T00:00:00+09:00") { e.run }
  end

  Conversation.destroy_all
  ReservableConversation.destroy_all
  CancelledConversation.destroy_all
  ConversationRequest.destroy_all
  User.destroy_all

  let(:hobbies)  { create_hobbies }
  let(:purposes) { create_purposes }

  let(:user) { create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
  let(:partner) { create :student, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }

  describe "GET /api/v1/conversation_requests.json" do
    context "when the user has some conversation requests" do
      before do
        1.upto 3 do |i|
          service1 = ConversationCreateService.new(user)
          service1.create(i.days.since, i.days.since + Conversation::DURATION, true)

          service2 = ConversationRequestCreateService.new(partner)
          service2.create_by_id(service1.conversation.reservable_conversations.first.try(:id))
        end
      end
      before(:each) do
        get "/api/v1/conversation_requests.json", headers: {
          "Authorization" => "Bearer #{partner.auth_token}",
        }
      end

      it "requests the current user's conversation requests, and returns those all", autodoc: true do
        expect(json["data"].count).to eq 3

        expect(json["data"][0]["id"]).to_not be_nil
        expect(json["data"][0]["conversation"]).to_not be_nil
        expect(json["data"][0]["user"]).to_not be_nil
        expect(json["data"][0]["start_at"]).to_not be_nil
        expect(json["data"][0]["end_at"]).to_not be_nil
      end

      it { expect(response.status).to eq 200 }

      after do
        Conversation.destroy_all
        ConversationRequest.destroy_all
      end
    end
  end

  describe "PATCH /api/v1/conversation_requests/:id.json" do
    context "when the user approves the student's request" do
      before(:each) do
        service1 = ConversationCreateService.new(user)
        service1.create(11.days.since, 11.days.since + Conversation::DURATION, true)

        service2 = ConversationRequestCreateService.new(partner)
        service2.create_by_id(service1.conversation.reservable_conversations.first.try(:id))

        patch "/api/v1/conversation_requests/#{service2.conversation_request.try(:id)}.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "requests the current user's conversation requests, and returns those all", autodoc: true do
        expect(json["id"]).to_not be_nil
        expect(json["conversation"]).to_not be_nil
        expect(json["user"]).to_not be_nil
        expect(json["start_at"]).to_not be_nil
        expect(json["end_at"]).to_not be_nil
      end

      it { expect(response.status).to eq 200 }

      after(:each) do
        Conversation.destroy_all
        ConversationRequest.destroy_all
      end
    end
  end

  describe "PATCH /api/v1/conversation_requests/:id.json" do
    context "別のteacherユーザーがstudentのリクエストを承認しようとする場合" do
      before(:each) do
        another_teacher = create :teacher, organization_device_id: nil

        service1 = ConversationCreateService.new(user)
        service1.create(11.days.since, 11.days.since + Conversation::DURATION, true)

        service2 = ConversationRequestCreateService.new(partner)
        service2.create_by_id(service1.conversation.reservable_conversations.first.try(:id))

        patch "/api/v1/conversation_requests/#{service2.conversation_request.try(:id)}.json", headers: {
          "Authorization" => "Bearer #{another_teacher.auth_token}",
        }
      end

      it "処理は実行されず、401エラーを返します。" do
        expect(response.status).to eq 401
      end

      after(:each) do
        Conversation.destroy_all
        ConversationRequest.destroy_all
      end
    end
  end
end
