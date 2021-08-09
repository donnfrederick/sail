require "rails_helper"

RSpec.describe BlockService, type: :feature do
  let(:hobbies)  { create_hobbies }
  let(:purposes) { create_purposes }

  describe "ユーザーのブロック処理をテストします。" do
    context "特に今まで接点のないユーザー同士のブロックをテストします。" do
      it "teacherがstudentをブロックしているはずです。" do
        teacher = create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3)
        student = create :student, hobbies: hobbies.first(3), purposes: purposes.first(3)
        service = BlockService.new teacher
        service.block(student)

        expect(teacher.blocks?(student)).to eq true
        expect(student.blocks?(teacher)).to eq false
      end

      it "これに関して特に通知はありません。" do
        before_count = Notification.count
        teacher = create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3)
        student = create :student, hobbies: hobbies.first(3), purposes: purposes.first(3)
        service = BlockService.new teacher
        service.block(student)
        after_count = Notification.count

        expect(before_count).to eq after_count
      end
    end
  end
end
