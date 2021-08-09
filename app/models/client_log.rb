class ClientLog < ApplicationRecord
  belongs_to :user, optional: true
end
