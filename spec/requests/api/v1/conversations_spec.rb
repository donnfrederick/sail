require "rails_helper"

RSpec.describe Api::V1::ConversationsController, type: :request do
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
  let(:conversation) do
    last_start_at = Conversation.by_teacher_id(user.id).order(start_at: :desc).first.try(:start_at)
    start_at = if last_start_at.nil?
                 3.days.since
               else
                 last_start_at + 3.days
               end

    service1 = ConversationCreateService.new(user)
    service1.create(start_at, start_at + Conversation::DURATION)

    service1.conversation.reload
    service2 = ConversationReserveService.new
    service2.reserve_by_reservable_conversation(partner, service1.conversation.reservable_conversations.first)

    service1.conversation
  end

  before do
    1.upto 10 do |i|
      service1 = ConversationCreateService.new(user)
      service1.create(i.days.since, i.days.since + Conversation::DURATION, false)

      service1.conversation.reload
      service2 = ConversationReserveService.new
      service2.reserve_by_reservable_conversation(partner, service1.conversation.reservable_conversations.first)
    end
  end

  describe "GET /api/v1/conversations.json" do
    context "when conversations exists" do
      before(:each) do
        get "/api/v1/conversations.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "returns some conversations" do
        expect(json["data"].count).to eq 10

        expect(json["data"][0]["id"]).to_not be_nil
        expect(json["data"][0]["channel_id"]).to_not be_nil
        expect(json["data"][0]["status"]).to_not be_nil
        expect(json["data"][0]["start_at"]).to_not be_nil
        expect(json["data"][0]["end_at"]).to_not be_nil
        expect(json["data"][0]["users"]).to_not be_nil
      end

      it { expect(response.status).to eq 200 }
    end

    # context "when specified period conversations exists" do
    #   before(:each) do
    #     get "/api/v1/conversations.json", headers: {
    #       "Authorization" => "Bearer #{user.auth_token}",
    #     }, params: {
    #       start_on: 1.days.since.in_time_zone(user.timezone).strftime("%Y-%m-%d"),
    #       end_on:   4.days.since.in_time_zone(user.timezone).strftime("%Y-%m-%d"),
    #     }
    #   end

    #   it "returns some conversations", autodoc: true do
    #     expect(json["data"].count).to eq 4

    #     expect(json["data"][0]["id"]).to_not be_nil
    #     expect(json["data"][0]["channel_id"]).to_not be_nil
    #     expect(json["data"][0]["status"]).to_not be_nil
    #     expect(json["data"][0]["start_at"]).to_not be_nil
    #     expect(json["data"][0]["end_at"]).to_not be_nil
    #     expect(json["data"][0]["users"]).to_not be_nil
    #   end

    #   it { expect(response.status).to eq 200 }
    # end

    # context "when current week conversations exists" do
    #   before(:each) do
    #     get "/api/v1/conversations.json", headers: {
    #       "Authorization" => "Bearer #{user.auth_token}",
    #     }, params: {
    #       term: Conversation::TERM_WEEKLY,
    #     }
    #   end

    #   it "returns some conversations" do
    #     expect(json["data"].count).to eq 5

    #     expect(json["data"][0]["id"]).to_not be_nil
    #     expect(json["data"][0]["channel_id"]).to_not be_nil
    #     expect(json["data"][0]["status"]).to_not be_nil
    #     expect(json["data"][0]["start_at"]).to_not be_nil
    #     expect(json["data"][0]["end_at"]).to_not be_nil
    #     expect(json["data"][0]["users"]).to_not be_nil

    #     expect(json["meta"]["start_on"]).to eq Time.parse("2017-12-31T00:00:00+09:00").in_time_zone(user.timezone).to_s(:iso8601_tz)
    #     expect(json["meta"]["end_on"]).to eq Time.parse("2018-01-06T23:59:59+09:00").in_time_zone(user.timezone).to_s(:iso8601_tz)
    #   end

    #   it { expect(response.status).to eq 200 }
    # end

    # context "when next week conversations exists" do
    #   before(:each) do
    #     get "/api/v1/conversations.json", headers: {
    #       "Authorization" => "Bearer #{user.auth_token}",
    #     }, params: {
    #       term: Conversation::TERM_WEEKLY,
    #       page: 2,
    #     }
    #   end

    #   it "returns some conversations" do
    #     expect(json["data"].count).to eq 5

    #     expect(json["meta"]["start_on"]).to eq Time.parse("2018-01-07T00:00:00+09:00").in_time_zone(user.timezone).to_s(:iso8601_tz)
    #     expect(json["meta"]["end_on"]).to eq Time.parse("2018-01-13T23:59:59+09:00").in_time_zone(user.timezone).to_s(:iso8601_tz)
    #   end

    #   it { expect(response.status).to eq 200 }
    # end

    # context "when current month conversations exists" do
    #   before(:each) do
    #     get "/api/v1/conversations.json", headers: {
    #       "Authorization" => "Bearer #{user.auth_token}",
    #     }, params: {
    #       term: Conversation::TERM_MONTHLY,
    #     }
    #   end

    #   it "returns some conversations" do
    #     expect(json["data"].count).to eq 10

    #     expect(json["data"][0]["id"]).to_not be_nil
    #     expect(json["data"][0]["channel_id"]).to_not be_nil
    #     expect(json["data"][0]["status"]).to_not be_nil
    #     expect(json["data"][0]["start_at"]).to_not be_nil
    #     expect(json["data"][0]["end_at"]).to_not be_nil
    #     expect(json["data"][0]["users"]).to_not be_nil

    #     expect(json["meta"]["start_on"]).to eq Time.parse("2018-01-01T00:00:00+09:00").in_time_zone(user.timezone).to_s(:iso8601_tz)
    #     expect(json["meta"]["end_on"]).to eq Time.parse("2018-01-31T23:59:59+09:00").in_time_zone(user.timezone).to_s(:iso8601_tz)
    #   end

    #   it { expect(response.status).to eq 200 }
    # end

    # context "when next month conversations exists" do
    #   before(:each) do
    #     get "/api/v1/conversations.json", headers: {
    #       "Authorization" => "Bearer #{user.auth_token}",
    #     }, params: {
    #       term: Conversation::TERM_MONTHLY,
    #       page: 2,
    #     }
    #   end

    #   it "returns some conversations" do
    #     expect(json["data"].count).to eq 0

    #     expect(json["meta"]["start_on"]).to eq Time.parse("2018-02-01T00:00:00+09:00").in_time_zone(user.timezone).to_s(:iso8601_tz)
    #     expect(json["meta"]["end_on"]).to eq Time.parse("2018-02-28T23:59:59+09:00").in_time_zone(user.timezone).to_s(:iso8601_tz)
    #   end

    #   it { expect(response.status).to eq 200 }
    # end
  end

  describe "GET /api/v1/conversations/:id.json" do
    context "when conversation exists" do
      before(:each) do
        conversation = Conversation.by_teacher_id(user.id).scheduled.first
        get "/api/v1/conversations/#{conversation.id}.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "returns the resosurce", autodoc: true do
        conversation = Conversation.by_teacher_id(user.id).scheduled.first

        expect(json["id"]).to eq conversation.id
        expect(json["channel_id"]).to eq conversation.channel_id
        expect(json["status"]).to eq conversation.status
        expect(json["start_at"]).to eq conversation.start_at.in_time_zone(user.timezone).to_s(:iso8601_tz)
        expect(json["end_at"]).to eq conversation.end_at.in_time_zone(user.timezone).to_s(:iso8601_tz)
        expect(json["users"].count).to eq conversation.users.count
        expect(json["users"][0]["id"]).to eq conversation.users.first.id
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "POST /api/v1/conversations.json" do
    context "when is 25min schedule created successfully" do
      let(:start_at) { Time.zone = user.timezone; 1.month.since }
      let(:end_at)   { Time.zone = user.timezone; start_at.since(Conversation::DURATION) }
      before(:each) do
        post "/api/v1/conversations.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          start_at: start_at.iso8601,
          end_at:   end_at.iso8601,
        }
      end

      it "return conversation", autodoc: true do
        expect(json["id"]).to_not be_nil
        expect(json["channel_id"]).to_not be_nil

        expect(json["status"]).to eq Conversation::STATUS_WAITING
        expect(json["start_at"]).to eq start_at.in_time_zone(user.timezone).to_s(:iso8601_tz)
        expect(json["end_at"]).to eq end_at.in_time_zone(user.timezone).to_s(:iso8601_tz)

        expect(json["users"].count).to eq 1
        expect(json["users"][0]["id"]).to eq user.id
      end

      it { expect(response.status).to eq 201 }
    end

    context "when is time range schedule created successfully" do
      let(:start_at) { Time.zone = user.timezone; 1.month.since }
      let(:end_at)   { Time.zone = user.timezone; start_at + 3.hours }
      before(:each) do
        post "/api/v1/conversations.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          start_at: start_at.in_time_zone(user.timezone).iso8601,
          end_at:   end_at.in_time_zone(user.timezone).iso8601,
        }
      end

      it "return conversation" do
        expect(json["id"]).to_not be_nil
        expect(json["channel_id"]).to_not be_nil

        expect(json["status"]).to eq Conversation::STATUS_WAITING
        expect(json["start_at"]).to eq start_at.in_time_zone(user.timezone).to_s(:iso8601_tz)
        expect(json["end_at"]).to eq end_at.in_time_zone(user.timezone).to_s(:iso8601_tz)

        expect(json["users"].count).to eq 1
        expect(json["users"][0]["id"]).to eq user.id
      end

      it { expect(response.status).to eq 201 }
    end

    context "when is start_at param only created successfully" do
      let(:start_at) { Time.zone = user.timezone; 1.month.since }
      let(:end_at) { Time.zone = user.timezone; start_at + Conversation::DURATION }
      before(:each) do
        post "/api/v1/conversations.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          start_at: start_at.in_time_zone(user.timezone).iso8601,
        }
      end

      it "return conversation" do
        expect(json["id"]).to_not be_nil
        expect(json["channel_id"]).to_not be_nil

        expect(json["status"]).to eq Conversation::STATUS_WAITING
        expect(json["start_at"]).to eq start_at.in_time_zone(user.timezone).to_s(:iso8601_tz)
        expect(json["end_at"]).to eq end_at.in_time_zone(user.timezone).to_s(:iso8601_tz)

        expect(json["users"].count).to eq 1
        expect(json["users"][0]["id"]).to eq user.id
      end

      it { expect(response.status).to eq 201 }
    end

    context "when accepting_requests parameter is properly given" do
      let(:start_at) { Time.zone = user.timezone; 3.month.since }
      let(:end_at)   { Time.zone = user.timezone; start_at.since(Conversation::DURATION) }
      before(:each) do
        post "/api/v1/conversations.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          start_at: start_at.iso8601,
          end_at:   end_at.iso8601,
          accepting_requests: 1,
        }
      end

      it "return conversation", autodoc: true do
        expect(json["id"]).to_not be_nil
        expect(json["channel_id"]).to_not be_nil

        expect(json["status"]).to eq Conversation::STATUS_WAITING
        expect(json["start_at"]).to eq start_at.in_time_zone(user.timezone).to_s(:iso8601_tz)
        expect(json["end_at"]).to eq end_at.in_time_zone(user.timezone).to_s(:iso8601_tz)
        expect(json["accepting_requests"]).to eq true

        expect(json["users"].count).to eq 1
        expect(json["users"][0]["id"]).to eq user.id
      end

      it { expect(response.status).to eq 201 }
    end

    context "accepting_requests=0 が明示的に渡された場合" do
      let(:start_at) { Time.zone = user.timezone; 3.month.since }
      let(:end_at)   { Time.zone = user.timezone; start_at.since(Conversation::DURATION) }
      before(:each) do
        post "/api/v1/conversations.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          start_at: start_at.iso8601,
          end_at:   end_at.iso8601,
          accepting_requests: 0,
        }
      end

      it "accepting_requests=falseの会話データが返されます。" do
        expect(json["start_at"]).to eq start_at.in_time_zone(user.timezone).to_s(:iso8601_tz)
        expect(json["end_at"]).to eq end_at.in_time_zone(user.timezone).to_s(:iso8601_tz)
        expect(json["accepting_requests"]).to eq false
      end

      it { expect(response.status).to eq 201 }
    end

    context "when parameters are wrong" do
      it "because of auth_token" do
        post "/api/v1/conversations.json", headers: {
          "Authorization" => "Bearer invalid_token",
        }, params: {
          start_at: 12.hours.since.iso8601,
          end_at:   13.hours.since.iso8601,
        }

        expect(response.status).to eq 401
      end

      it "because of start_at is past time" do
        post "/api/v1/conversations.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          start_at: 12.hours.ago.in_time_zone(user.timezone).iso8601,
          end_at:   11.hours.ago.in_time_zone(user.timezone).iso8601,
        }

        expect(response.status).to eq 422
      end
    end
  end

  describe "DELETE /api/v1/conversations/:id.json" do
    context "when is deleted" do
      let(:teacher) { create(:teacher, organization_device_id: nil) }
      let(:conversation) { create :conversation, teacher: teacher }
      before(:each) do
        delete "/api/v1/conversations/#{conversation.id}.json", headers: {
          "Authorization" => "Bearer #{teacher.auth_token}",
        }
      end

      it { expect(response.status).to eq 204 }
    end

    context "when other user" do
      let(:other_user) { create :teacher, organization_device_id: nil }
      let(:conversation) { create :conversation, teacher: other_user }
      before(:each) do
        delete "/api/v1/conversations/#{conversation.id}.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it { expect(response.status).to eq 404 }
    end
  end

  describe "POST /api/v1/conversations/:id/evaluate2.json" do
    context "when is updated successfully" do
      let(:evaluate) do
        {
          fun: 4,
          ability: 1,
          time: 1,
          quality: [1, 2, 3],
        }
      end
      before(:each) do
        conversation.update!(teacher_online_status: "Ontime", student_online_status: "Online")

        post "/api/v1/conversations/#{conversation.id}/evaluate2.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: evaluate
      end

      it "return conversation", autodoc: true do
        expect(json["id"]).to eq conversation.id
        expect(json["channel_id"]).to eq conversation.channel_id

        expect(json["status"]).to eq conversation.status
        expect(json["start_at"]).to eq conversation.start_at.in_time_zone(user.timezone).to_s(:iso8601_tz)
        expect(json["end_at"]).to eq conversation.end_at.in_time_zone(user.timezone).to_s(:iso8601_tz)

        # TODO より精緻な検証をすべき
        expect(json["evaluate"]).to_not be_nil
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "PATCH /api/v1/conversations/:id/evaluate2.json" do
    context "when is updated successfully" do
      let(:evaluate) do
        {
          fun: 4,
          ability: 1,
          time: 1,
          quality: [1,2,3]
        }
      end
      let(:new_evaluate) do
        {
          fun: 4,
          ability: 1,
          time: 1,
          quality: [4]
        }
      end
      before(:each) do
        conversation.update!(teacher_online_status: "Ontime", student_online_status: "Late")

        post "/api/v1/conversations/#{conversation.id}/evaluate2.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: evaluate
        post "/api/v1/conversations/#{conversation.id}/evaluate2.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: new_evaluate
      end

      it "return conversation", autodoc: true do
        expect(json["id"]).to eq conversation.id
        expect(json["channel_id"]).to eq conversation.channel_id

        expect(json["status"]).to eq conversation.status
        expect(json["start_at"]).to eq conversation.start_at.in_time_zone(user.timezone).to_s(:iso8601_tz)
        expect(json["end_at"]).to eq conversation.end_at.in_time_zone(user.timezone).to_s(:iso8601_tz)

        # TODO より精緻な検証をすべき
        expect(json["evaluate"]).to_not be_nil
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "GET /api/v1/conversations/calendar.json" do
    context "when enable dates exists" do
      let(:teacher) { create :teacher, organization_device_id: nil }

      before do
        -3.upto 10 do |i|
          service = ConversationCreateService.new(teacher)
          service.validate = false
          service.create(i.days.since, i.days.since + Conversation::DURATION)
        end
      end

      before(:each) do
        get "/api/v1/conversations/calendar.json", headers: {
          "Authorization" => "Bearer #{teacher.auth_token}",
        }, params: {
          year:  '2018',
          month: '1',
        }
      end

      it "return calendar", autodoc: true do
        expect(json["1"]["is_enabled"]).to be false
        expect(json["1"]["is_reserved"]).to be true
        expect(json["2"]["is_enabled"]).to be false
        expect(json["2"]["is_reserved"]).to be true
        expect(json["3"]["is_enabled"]).to be false
        expect(json["3"]["is_reserved"]).to be true
        expect(json["10"]["is_enabled"]).to be true
        expect(json["10"]["is_reserved"]).to be true
      end

      it { expect(response.status).to eq 200 }
    end

    # context "when conversation exists" do
    #   before(:each) do
    #     get "/api/v1/conversations/calendar.json", headers: {
    #       "Authorization" => "Bearer #{student.auth_token}",
    #     }, params: {
    #       year:  '2018',
    #       month: '1',
    #     }
    #   end

    #   it "return calendar", autodoc: true do
    #   # TODO こちら失敗するときがあるため原因を追求し修正後にテスト
    #   expect(json["1"]["is_enabled"]).to be true
    #   expect(json["1"]["is_reserved"]).to be false
    #   expect(json["10"]["is_enabled"]).to be true
    #   expect(json["10"]["is_reserved"]).to be false
    #   expect(json["11"]["is_enabled"]).to be false
    #   expect(json["11"]["is_reserved"]).to be true
    #   expect(json["20"]["is_enabled"]).to be false
    #   expect(json["20"]["is_reserved"]).to be true
    #   expect(json["21"]["is_enabled"]).to be false
    #   expect(json["21"]["is_reserved"]).to be false
    #   expect(json["30"]["is_enabled"]).to be false
    #   expect(json["30"]["is_reserved"]).to be false
    #   end

    #   it { expect(response.status).to eq 200 }
    # end

    context "when disable overdue bookings" do
      let(:student) { create :student, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
      let(:teacher) { create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }

      before(:each) do
        -3.upto -1 do |i|
          service = ConversationCreateService.new(teacher)
          service.validate = false
          service.create(i.hours.since, i.hours.since + Conversation::DURATION)
        end

        get "/api/v1/conversations/calendar.json", headers: {
          "Authorization" => "Bearer #{student.auth_token}",
        }, params: {
          year:  '2018',
          month: '1',
        }
      end

      it "return calendar", autodoc: true do
        # 予定時刻を過ぎた空き予約はカウントされない
        expect(json["1"]["is_enabled"]).to be false
        expect(json["1"]["is_reserved"]).to be false
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "GET /api/v1/conversations/recommend.json" do
    context "when conversation exists" do
      let(:student) { create :student, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
      let(:teacher) { create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
      let(:date_on) { "2018-01-01" }

      before do
        student.update(level: Student::LEVEL_N1)

        1.upto 10 do |i|
          start_at = ("2018-01-01T00:00:00+0900".to_datetime + i.days)
          end_at = ("2018-01-01T00:00:00+0900".to_datetime + i.days + 3.hours)

          service = ConversationCreateService.new(teacher)
          service.create(start_at, end_at)
        end
      end

      before(:each) do
        get "/api/v1/conversations/recommend.json", headers: {
          "Authorization" => "Bearer #{student.auth_token}",
        }, params: { date_on: date_on }
      end

      it "return conversations", autodoc: true do
        Time.zone = user.timezone
        expect(json.count).to eq 6
        # expect(json.count).to eq 4

        expect(json[0]["id"]).to_not be_nil
        expect(json[0]["channel_id"]).to_not be_nil

        expect(json[0]["status"]).to eq Conversation::STATUS_WAITING
        expect(json[0]["start_at"]).to match /^#{date_on}/
        # expect(json[0]["end_at"]).to match /^#{date_on}/

        expect(json[0]["users"].count).to eq 1
        expect(json[0]["users"][0]["id"]).to eq teacher.id
        expect(json[0]["users"][0].has_key?("auth_token")).to be false
      end

      it { expect(response.status).to eq 200 }
    end

    context "when conversation not exists (teacher is blocking student)" do
      let(:student) { create :student, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
      let(:teacher) { create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
      let(:date_on) { "2018-01-01" }

      before do
        create :block, from_user: teacher, to_user: student

        student.update(level: Student::LEVEL_N1)

        start_at = "2018-01-01T00:00:00+0900".to_datetime + 1.hour
        end_at = "2018-01-01T00:00:00+0900".to_datetime + 3.hours

        service = ConversationCreateService.new(teacher)
        service.create(start_at, end_at)
      end

      before(:each) do
        get "/api/v1/conversations/recommend.json", headers: {
          "Authorization" => "Bearer #{student.auth_token}",
        }, params: { date_on: date_on }
      end

      it "return conversations" do
        expect(json.count).to eq 0
      end

      it { expect(response.status).to eq 200 }
    end

    context "when conversation not exists (student is blocking teacher)" do
      let(:student) { create :student, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
      let(:teacher) { create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
      let(:date_on) { "2018-01-01" }

      before do
        create :block, from_user: student, to_user: teacher
        student.update(level: Student::LEVEL_N1)

        start_at = "2018-01-01T00:00:00+0900".to_datetime + 1.hour
        end_at = "2018-01-01T00:00:00+0900".to_datetime + 3.hours

        service = ConversationCreateService.new(teacher)
        service.create(start_at, end_at)
      end

      before(:each) do
        get "/api/v1/conversations/recommend.json", headers: {
          "Authorization" => "Bearer #{student.auth_token}",
        }, params: { date_on: date_on }
      end

      it "return conversations" do
        expect(json.count).to eq 0
      end

      it { expect(response.status).to eq 200 }
    end

    context "when disable overdue bookings" do
      let(:student) { create :student, hobbies: hobbies.first(3), purposes: purposes.first(3), level: Student::LEVEL_N1, organization_device_id: nil }
      let(:teacher) { create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
      let(:date_on) { "2018-01-01" }
      let(:yesterday) { Time.now.in_time_zone(student.timezone).prev_day.beginning_of_day }
      let(:today) { Time.now.in_time_zone(student.timezone).next_day.beginning_of_day }

      before(:each) do
        1.upto 3 do |i|
          service = ConversationCreateService.new(teacher)
          service.validate = false
          service.create(yesterday + i.hours, yesterday + i.hours + Conversation::DURATION)
        end

        3.upto 6 do |i|
          service = ConversationCreateService.new(teacher)
          service.create(today + i.hours, today + i.hours + Conversation::DURATION)
        end

        get "/api/v1/conversations/recommend.json", headers: {
          "Authorization" => "Bearer #{student.auth_token}",
        }, params: { date_on: date_on }
      end

      # it "return conversations" do
      #   expect(json.count).to eq 4

      #   expect(json[0]["start_at"]).to eq((today + 3.hours).iso8601)
      #   expect(json[1]["start_at"]).to eq((today + 4.hours).iso8601)
      #   expect(json[2]["start_at"]).to eq((today + 5.hours).iso8601)
      # end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "POST /api/v1/conversations/reserve.json" do
    context "when conversation exists" do
      let(:student) { create :student, hobbies: hobbies.first(3), purposes: purposes.first(3), level: Student::LEVEL_N1, organization_device_id: nil }
      let(:teacher) { create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
      let(:conversation) do
        service = ConversationCreateService.new(teacher)
        service.create(1.month.since, 1.month.since + 6.hours)
        service.conversation
      end
      let(:reservable_conversation) do
        conversation.reload
        conversation.reservable_conversations.last
      end

      before(:each) do
        post "/api/v1/conversations/reserve.json", headers: {
          "Authorization" => "Bearer #{student.auth_token}",
        }, params: {
          id: reservable_conversation.id,
        }
      end

      it "return conversation", autodoc: true do
        conversation.reload
        expect(conversation.start_at).to eq reservable_conversation.start_at
        expect(conversation.end_at).to eq reservable_conversation.end_at

        expect(json["id"]).to eq conversation.id
        expect(json["channel_id"]).to eq conversation.channel_id
        expect(json["status"]).to eq Conversation::STATUS_QUEUED
        expect(json["start_at"]).to eq conversation.start_at.in_time_zone(student.timezone).to_s(:iso8601_tz)
        expect(json["end_at"]).to eq conversation.end_at.in_time_zone(student.timezone).to_s(:iso8601_tz)
        expect(json["users"].count).to eq 2
        expect(json["users"][0]["id"]).to eq teacher.id
        expect(json["users"][1]["id"]).to eq student.id
        expect(json["users"][0].has_key?("auth_token")).to be false
      end

      it { expect(response.status).to eq 200 }
    end

    context "when conversation reservation has expired" do
      let(:student) { create :student, hobbies: hobbies.first(3), purposes: purposes.first(3), level: Student::LEVEL_N1, organization_device_id: nil }
      let(:teacher) { create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
      let(:conversation) do
        service = ConversationCreateService.new(teacher)
        service.validate = false
        service.create(12.hours.ago, 12.hours.ago + Conversation::DURATION)
        service.conversation
      end
      let(:reservable_conversation) do
        conversation.reload
        conversation.reservable_conversations.last
      end

      before(:each) do
        post "/api/v1/conversations/reserve.json", headers: {
          "Authorization" => "Bearer #{student.auth_token}",
        }, params: {
          id: reservable_conversation.id,
        }
      end

      it "renders error message" do
        expect(json["error"]["message"][0]).to eq I18n.t("errors.conversation.not_available", locale: student.default_locale)
      end

      it { expect(response.status).to eq 422 }
    end
  end

  describe "POST /api/v1/conversation_requests.json" do
    context "when a conversation request has been made successfully" do
      let(:conversation) do
        service = ConversationCreateService.new(user)
        service.create(1.month.since, 1.month.since + 6.hours, true)
        service.conversation
      end
      before(:each) do
        conversation.reload
        rc = conversation.reservable_conversations.first
        post "/api/v1/conversation_requests.json", headers: {
          "Authorization" => "Bearer #{partner.auth_token}",
        }, params: {
          reservable_conversation_id: rc.id
        }
      end

      it "requests conversation to the exactly conversation as the current user, and returns the created request", autodoc: true do
        expect(json["id"]).to_not be_nil
        expect(json["start_at"]).to eq conversation.start_at.in_time_zone(partner.timezone).to_s(:iso8601_tz)
        expect(json["end_at"]).to eq (conversation.start_at + Conversation::DURATION).in_time_zone(partner.timezone).to_s(:iso8601_tz)
        expect(json["conversation"].count).to_not be_nil
      end

      it { expect(response.status).to eq 201 }
    end
  end

  describe "DELETE /api/v1/conversation_requests.json" do
    context "when a conversation request is deleted successfully" do
      let(:conversation) do
        service = ConversationCreateService.new(user)
        service.create(3.month.since, 3.month.since + 6.hours, true)
        service.conversation
      end
      before(:each) do
        rc = conversation.reservable_conversations.first
        post "/api/v1/conversation_requests.json", headers: {
          "Authorization" => "Bearer #{partner.auth_token}",
        }, params: {
          reservable_conversation_id: rc.id
        }
        delete "/api/v1/conversation_requests/#{conversation.id}.json", headers: {
          "Authorization" => "Bearer #{partner.auth_token}",
        }
      end

      it "cancels the conversation request made by the current user, and returns nothing", autodoc: true do
        expect(response.status).to eq 204
      end
    end
  end

  describe "POST /api/v1/conversations/:id/report.json" do
    context "報告データがrequest_block=1とともに送信された場合" do
      before(:each) do
        post "/api/v1/conversations/#{conversation.id}/report.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          report_reasons: [
            1,
            3
          ],
          report_detail: "問題がありました",
          request_block: 1
        }
      end

      it "データベースに報告の種類と文章を記録し、相手をブロックします。", autodoc: true do
        partner.reload
        expect(partner.blocked_by?(user)).to be true
        user.unblock(partner)
        partner.reload
        expect(json["report_reasons"]).to_not be_nil
        expect(json["report_detail"]).to_not be_nil
      end

      it { expect(response.status).to eq 201 }
    end
  end

  describe "POST /api/v1/conversations/:id/report.json" do
    context "request_block=0が明示的に渡された場合" do
      before(:each) do
        post "/api/v1/conversations/#{conversation.id}/report.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          report_reasons: [
            1,
            3
          ],
          report_detail: "問題がありました",
          request_block: 0
        }
      end

      it "相手ユーザーはブロックされません。" do
        partner.reload
        expect(partner.blocked_by?(user)).to be false
        expect(json["report_reasons"]).to_not be_nil
        expect(json["report_detail"]).to_not be_nil
      end

      it { expect(response.status).to eq 201 }
    end
  end

  describe "PATCH /api/v1/conversations/:id/report.json" do
    context "when is a report updated successfully" do
      before(:each) do
        post "/api/v1/conversations/#{conversation.id}/report.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          report_reasons: [
            1,
            2
          ],
          report_detail: "問題がありました",
          request_block: 1
        }
        patch "/api/v1/conversations/#{conversation.id}/report.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          report_reasons: [
            1,
            3,
            4
          ],
          report_detail: "更新しました。問題がありました",
          request_block: 1
        }
      end

      it "updates conversation report for the current user, and returns the updated report object", autodoc: true do
        expect(json["report_detail"]).to_not be_nil
        expect(json["report_reasons"]).to_not be_nil
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "POST /api/v1/conversations/:id/memo.json" do
    context "when is a memo created successfully" do
      before(:each) do
        post "/api/v1/conversations/#{conversation.id}/memo.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          memo: "今日の会話は非常に楽しかったので、次回もこの人だと嬉しい。"
        }
      end

      it "creates conversation memo, and returns the created memo object", autodoc: true do
        expect(json["memo"]).to_not be_nil
        expect(json["timestamp"]).to_not be_nil
      end

      it { expect(response.status).to eq 201 }
    end
  end

  describe "PATCH /api/v1/conversations/:id/memo.json" do
    context "when is a memo updated" do
      before(:each) do
        post "/api/v1/conversations/#{conversation.id}/memo.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          memo: "今日の会話は非常に楽しかったので、次回もこの人だと嬉しい。"
        }
        patch "/api/v1/conversations/#{conversation.id}/memo.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          memo: "更新してみた。今日の会話は非常に楽しかったので、次回もこの人だと嬉しい。"
        }
      end

      it "updates conversation memo, and returns the created memo object", autodoc: true do
        expect(json["memo"]).to_not be_nil
        expect(json["timestamp"]).to_not be_nil
      end

      it { expect(response.status).to eq 201 }
    end
  end

  describe "GET /api/v1/conversations/recommend/:id.json" do
    context "when conversation exists" do
      let(:student) { create :student, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
      let(:teacher) { create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
      let(:conversation) do
        service1 = ConversationCreateService.new(teacher)
        service1.create(1.days.since, 1.days.since + 25.minutes)
        service1.conversation
      end
      let(:reservable_conversation) do
        conversation.reload
        conversation.reservable_conversations.last
      end
      before(:each) do
        student.update(level: Student::LEVEL_N1)

        get "/api/v1/conversations/recommend/#{reservable_conversation.id}.json", headers: {
          "Authorization" => "Bearer #{student.auth_token}",
        }
      end

      it "returns the resosurce", autodoc: true do
        expect(json["id"]).to eq reservable_conversation.id
        expect(json["start_at"]).to eq reservable_conversation.start_at.in_time_zone(student.timezone).to_s(:iso8601_tz)
        expect(json["end_at"]).to eq reservable_conversation.end_at.in_time_zone(student.timezone).to_s(:iso8601_tz)
        expect(json["channel_id"]).to eq conversation.channel_id
        expect(json["status"]).to eq conversation.status
        expect(json["users"].count).to eq conversation.users.count
        expect(json["users"][0]["id"]).to eq conversation.users.first.id
        expect(json["users"][0].has_key?("auth_token")).to be false
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "GET /api/v1/conversations/cancelled/:id.json" do
    let(:student) { create :student, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
    let(:teacher) { create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3), organization_device_id: nil }
    let(:conversation) do
      service1 = ConversationCreateService.new(teacher)
      service1.create(1.days.since, 1.days.since + 25.minutes)

      service1.conversation.reload
      service2 = ConversationReserveService.new
      service2.reserve_at(teacher, student, service1.start_at)
      service1.conversation
    end

    context "すでにキャンセル済みの会話データを取得する" do
      before(:each) do
        CancelledConversation.destroy_all
        delete "/api/v1/conversations/#{conversation.id}.json", headers: {
          "Authorization" => "Bearer #{student.auth_token}",
        }
        get "/api/v1/conversations/cancelled/#{conversation.id}.json", headers: {
          "Authorization" => "Bearer #{student.auth_token}",
        }
      end

      it "キャンセルされた会話データは、`channel_id`が空文字、`evaluate`が`nil`、`memos`が空リストになります。", autodoc: true do
        expect(json["channel_id"]).to eq ""
        expect(json["start_at"]).to eq conversation.start_at.in_time_zone(student.timezone).to_s(:iso8601_tz)
        expect(json["end_at"]).to eq conversation.end_at.in_time_zone(student.timezone).to_s(:iso8601_tz)
        expect(json["users"].count).to eq 2
      end
    end
  end

  describe "GET /api/v1/conversations/requests_from_students.json" do
    context "teacherのリクエスト枠一覧を取得します。" do
      before(:each) do
        user.conversations.update_all(accepting_requests: true)
        get "/api/v1/conversations/requests_from_students.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "conversationsのリストを返します。各conversationの中にはconversation_requestsがあります。" do
        # TODO これはひどい
        rc_count = user.conversations.where("start_at > ?", Time.now).count
        expect(json.count).to eq rc_count
        0.upto(rc_count - 1) do |i|
          expect(json[i]["channel_id"]).to_not be_nil
          expect(json[i]["conversation_requests"]).to_not be_nil
          expect(json[i]["users"]).to_not be_nil
        end
      end

      it { expect(response.status).to eq 200 }
    end
  end
end
