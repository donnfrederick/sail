require 'rails_helper'

RSpec.describe Conversation, type: :model do
  around do |e|
    travel_to("2018-01-01T00:00:00+09:00") { e.run }
  end
  let(:hobbies)  { create_hobbies }
  let(:purposes) { create_purposes }
  let(:teacher)       { create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3) }
  let(:other_teacher) { create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3) }
  let(:student)       { create :student, hobbies: hobbies.first(3), purposes: purposes.first(3) }
  let(:other_student) { create :student, hobbies: hobbies.first(3), purposes: purposes.first(3) }
  let(:wating_teacher_conversation) { create :conversation, users: [teacher], status: Conversation::STATUS_WAITING }
  let(:wating_student_conversation) { create :conversation, users: [student], status: Conversation::STATUS_WAITING }
  let(:queued_conversation) { create :conversation, users: [teacher, student], status: Conversation::STATUS_QUEUED }

  describe "@conversation.reserve_from_admin!" do
    context "when is student makes a reservation for conversation" do
      it "when is student reserve conversation" do
        conversation = wating_teacher_conversation
        conversation.reserve_from_admin!([
          conversation.teacher,
          student
        ])

        expect(conversation.status).to eq Conversation::STATUS_QUEUED
        expect(conversation.teacher).to eq teacher
        expect(conversation.student).to eq student
      end

      it "when is same teacher reserve conversation" do
        # @conversation.reserve_from_admin! では同一ユーザーの追加は補正されるため無視される
        conversation = wating_teacher_conversation
        conversation.reserve_from_admin!([
          conversation.teacher,
          conversation.teacher
        ])

        expect(conversation.status).to eq Conversation::STATUS_WAITING
        expect(conversation.users.count).to eq 1
        expect(conversation.teacher).to eq teacher
        expect(conversation.student).to be_nil
      end

      it "when is other teacher reserve conversation" do
        # @conversation.reserve_from_admin! では後から追加されたユーザーで上書きされる
        conversation = wating_teacher_conversation
        conversation.reserve_from_admin!([
          conversation.teacher,
          other_teacher
        ])

        expect(conversation.status).to eq Conversation::STATUS_WAITING
        expect(conversation.users.count).to eq 1
        expect(conversation.teacher).to eq other_teacher
        expect(conversation.student).to be_nil
      end
    end

    context "when is teacher makes a reservation for conversation" do
      it "when is teacher reserve conversation" do
        conversation = wating_student_conversation
        conversation.reserve_from_admin!([
          teacher,
          conversation.student
        ])
        expect(conversation.status).to eq Conversation::STATUS_QUEUED
        expect(conversation.teacher).to eq teacher
        expect(conversation.student).to eq student
      end

      it "when is same student reserve conversation" do
        # @conversation.reserve_from_admin! では同一ユーザーの追加は補正されるため無視される
        conversation = wating_student_conversation
        conversation.reserve_from_admin!([
          conversation.student,
          conversation.student
        ])
        expect(conversation.status).to eq Conversation::STATUS_WAITING
        expect(conversation.users.count).to eq 1
        expect(conversation.student).to eq student
        expect(conversation.teacher).to be_nil
      end

      it "when is other student reserve conversation" do
        # @conversation.reserve_from_admin! では後から追加されたユーザーで上書きされる
        conversation = wating_student_conversation
        conversation.reserve_from_admin!([
          other_student,
          conversation.student
        ])
        expect(conversation.status).to eq Conversation::STATUS_WAITING
        expect(conversation.users.count).to eq 1
        expect(conversation.student).to eq other_student
        expect(conversation.teacher).to be_nil
      end
    end

    context "when is update conversation attributes" do
      it "when is change teacher" do
        conversation = queued_conversation
        conversation.reserve_from_admin!([
          other_teacher,
          conversation.student
        ])
        expect(conversation.status).to eq Conversation::STATUS_QUEUED
        expect(conversation.users.count).to eq 2
        expect(conversation.teacher).to eq other_teacher
        expect(conversation.student).to eq student
      end

      it "when is same teacher" do
        conversation = queued_conversation
        conversation.reserve_from_admin!([
          conversation.teacher,
          conversation.teacher
        ])
        expect(conversation.status).to eq Conversation::STATUS_QUEUED
        expect(conversation.users.count).to eq 2
        expect(conversation.teacher).to eq teacher
        expect(conversation.student).to eq student
      end

      it "when is change student" do
        conversation = queued_conversation
        conversation.reserve_from_admin!([
          conversation.teacher,
          other_student
        ])
        expect(conversation.status).to eq Conversation::STATUS_QUEUED
        expect(conversation.users.count).to eq 2
        expect(conversation.teacher).to eq teacher
        expect(conversation.student).to eq other_student
      end

      it "when is same student" do
        conversation = queued_conversation
        conversation.reserve_from_admin!([
          conversation.student,
          conversation.student
        ])
        expect(conversation.status).to eq Conversation::STATUS_QUEUED
        expect(conversation.users.count).to eq 2
        expect(conversation.teacher).to eq teacher
        expect(conversation.student).to eq student
      end

      it "when is change teacher and student" do
        conversation = queued_conversation
        conversation.reserve_from_admin!([
          other_teacher,
          other_student
        ])
        expect(conversation.status).to eq Conversation::STATUS_QUEUED
        expect(conversation.users.count).to eq 2
        expect(conversation.teacher).to eq other_teacher
        expect(conversation.student).to eq other_student
      end

      it "when is change other attributes. " do
        conversation = queued_conversation
        conversation.start_at = 3.hours.since
        conversation.save

        expect(conversation.status).to eq Conversation::STATUS_QUEUED
        expect(conversation.users.count).to eq 2
        expect(conversation.teacher).to eq teacher
        expect(conversation.student).to eq student
      end
    end
  end
end
