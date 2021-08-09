require 'rails_helper'

RSpec.describe UsersGrade, type: :model do

  let(:student) { create(:student) }

  describe "update an existing UsersGrade record" do
    context "when number between the grade is given" do
      it { expect(student.users_grade.update(conversation_count: 31)).to eq true }
      it { expect(student.users_grade.update(conversation_count: 1000)).to eq true }
      it { expect(student.users_grade.update(conversation_count: 31)).to eq true }
    end

    context "when valid count is given" do
      it { expect(student.users_grade.update(absence_count: 30)).to eq true }
      it { expect(student.users_grade.update(lateness_count: 99)).to eq true }
    end

    context "when invalid count is given" do
      it { expect(student.users_grade.update(absence_count: -1)).to eq false }
    end
  end
end
