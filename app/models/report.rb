# == Schema Information
#
# Table name: reports
#
#  id          :bigint(8)        not null, primary key
#  term        :string(191)
#  recorded_on :date
#  kind        :string(191)
#  count       :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Report < ApplicationRecord
end
