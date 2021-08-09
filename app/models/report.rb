# == Schema Information
#
# Table name: reports
#
#  id          :bigint           not null, primary key
#  count       :integer
#  kind        :string(191)
#  recorded_on :date
#  term        :string(191)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Report < ApplicationRecord
end
