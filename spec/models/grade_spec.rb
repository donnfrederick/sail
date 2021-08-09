require 'rails_helper'

RSpec.describe Grade, type: :model do

  let(:grade_member)   { Grade.where(type: Grade::TYPE_MEMBER).order(id: :asc).first }
  let(:grade_silver)   { Grade.where(type: Grade::TYPE_SILVER).order(id: :asc).first }
  let(:grade_gold)     { Grade.where(type: Grade::TYPE_GOLD).order(id: :asc).first }
  let(:grade_platinum) { Grade.where(type: Grade::TYPE_PLATINUM).order(id: :asc).first }

  describe "when multiple grades are registered" do
    context "when numbers are given" do
      it { expect(Grade.available_for(current_step: 0,                   conversation_count: grade_member.min_conversation_count,   absence_percentage: grade_member.max_absence_percentage).backward.first.try(:id)).to eq grade_member.id }
      it { expect(Grade.available_for(current_step: grade_member.step,   conversation_count: grade_silver.min_conversation_count,   absence_percentage: grade_silver.max_absence_percentage).backward.first.try(:id)).to eq grade_silver.id }
      it { expect(Grade.available_for(current_step: grade_silver.step,   conversation_count: grade_silver.min_conversation_count,   absence_percentage: grade_member.max_absence_percentage).backward.first.try(:id)).to eq grade_member.id }
      it { expect(Grade.available_for(current_step: grade_gold.step,     conversation_count: grade_gold.min_conversation_count,     absence_percentage: grade_gold.max_absence_percentage).backward.first.try(:id)).to eq grade_gold.id }
      it { expect(Grade.available_for(current_step: grade_gold.step,     conversation_count: grade_gold.min_conversation_count,     absence_percentage: grade_gold.max_absence_percentage).backward.first.try(:id)).to eq grade_gold.id }
      it { expect(Grade.available_for(current_step: grade_platinum.step, conversation_count: grade_platinum.min_conversation_count, absence_percentage: grade_platinum.max_absence_percentage).backward.first.try(:id)).to eq grade_platinum.id }
      it { expect(Grade.available_for(current_step: grade_platinum.step, conversation_count: grade_platinum.min_conversation_count, absence_percentage: grade_platinum.max_absence_percentage).backward.first.try(:id)).to eq grade_platinum.id }
    end
    context "when number is given" do
      it { expect(Grade.available_for(current_step: 0).backward.first.try(:id)).to eq grade_member.id }
      it { expect(Grade.available_for(current_step: grade_member.step).backward.first.try(:id)).to eq grade_silver.id }
      it { expect(Grade.available_for(current_step: grade_silver.step).backward.first.try(:id)).to eq grade_gold.id }
      it { expect(Grade.available_for(current_step: grade_platinum.step).backward.first.try(:id)).to eq grade_platinum.id }
      it { expect(Grade.available_for(current_step: grade_platinum.step, conversation_count: grade_platinum.min_conversation_count).backward.first.try(:id)).to eq grade_platinum.id }
      it { expect(Grade.available_for(current_step: grade_platinum.step, absence_percentage: grade_member.max_absence_percentage).backward.first.try(:id)).to eq grade_member.id }
      it { expect(Grade.available_for(current_step: grade_platinum.step, discommunication_percentage: grade_platinum.max_discommunication_percentage).backward.first.try(:id)).to eq grade_platinum.id }
      it { expect(Grade.available_for(current_step: grade_platinum.step, no_video_percentage: grade_platinum.max_no_video_percentage).backward.first.try(:id)).to eq grade_platinum.id }
    end
  end
end
