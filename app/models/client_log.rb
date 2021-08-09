# == Schema Information
#
# Table name: client_logs
#
#  id         :bigint           not null, primary key
#  data       :text(65535)      not null
#  slug       :string(191)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_client_logs_on_slug     (slug)
#  index_client_logs_on_user_id  (user_id)
#
class ClientLog < ApplicationRecord
  belongs_to :user, optional: true
end
