require 'rails_helper'

RSpec.describe Favorite, type: :model do
  let(:hobbies)  { create_hobbies }
  let(:purposes) { create_purposes }
  let(:teacher)       { create :teacher, hobbies: hobbies.first(3), purposes: purposes.first(3) }
  let(:student)       { create :student, hobbies: hobbies.first(3), purposes: purposes.first(3) }

  describe "お気に入りとブロックの挙動のテスト" do
    context "ブロックしている相手をお気に入り登録すると" do
      before(:each) do
        teacher.block(student)
        teacher.favorite(student)
      end
      it "ブロックは解除されます。" do
        expect(student.blocked_by?(teacher)).to eq false
        expect(student.favorite_by?(teacher)).to eq true
      end
    end

    context "自分をブロックしている相手をお気に入り登録すると" do
      before(:each) do
        teacher.block(student)
        student.favorite(teacher)
      end
      it "相手は自分をブロックしたままになります。" do
        expect(student.blocked_by?(teacher)).to eq true
        expect(teacher.favorite_by?(student)).to eq true
      end
    end
  end
end
