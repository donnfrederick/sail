require 'rails_helper'

RSpec.describe Block, type: :model do
  let(:hobbies)  { create_hobbies }
  let(:purposes) { create_purposes }
  let(:teacher)       { create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3) }
  let(:student)       { create :student, hobbies: hobbies.first(3), purposes: purposes.first(3) }

  describe "お気に入りとブロックの挙動のテスト" do
    context "お気に入り登録している相手をブロックすると" do
      before(:each) do
        teacher.favorite(student)
        teacher.block(student)
      end
      it "お気に入り登録は解除されます。" do
        expect(student.blocked_by?(teacher)).to eq true
        expect(student.favorite_by?(teacher)).to eq false
      end
    end

    context "自分をお気に入り登録している相手をブロックすると" do
      before(:each) do
        student.favorite(teacher)
        teacher.block(student)
      end
      it "相手のお気に入り登録はそのままです。" do
        expect(student.blocked_by?(teacher)).to eq true
        expect(teacher.favorite_by?(teacher)).to eq false
      end
    end
  end
end
