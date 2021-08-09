require 'rails_helper'

RSpec.describe User, type: :model do
  let(:username) { "647adf2827f978f72067ac58f9067a94" }
  let(:password) { "9cd3f17adc50f95230eee5f8a9c25739" }
  let(:expect_digest) { "515f8954154134c56f2dd7e0d9685f29" }

  let(:teacher) {
    create(
      :teacher,
      username: username,
      password: password,
      password_confirmation: password,
    )
  }
  let(:student) {
    create(
      :student,
      username: username,
      password: password,
      password_confirmation: password,
    )
  }

  describe "when is same password_digest as the old system" do
    context "when is teacher" do
      it { expect(teacher).to be_valid }
      it { expect(teacher.username).to eq username }
      it { expect(teacher.password_digest).to eq expect_digest }

      it { expect(teacher.authenticate(password)).to be true }
    end

    context "when is student" do
      it { expect(student).to be_valid }
      it { expect(student.username).to eq username }
      it { expect(student.password_digest).to eq expect_digest }

      it { expect(student.authenticate(password)).to be true }
    end
  end
end
