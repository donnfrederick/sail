# == Schema Information
#
# Table name: organizations
#
#  id            :bigint(8)        not null, primary key
#  industry      :string(191)      not null
#  country       :string(191)
#  name_ja       :string(191)
#  name_en       :string(191)
#  name_kana     :string(191)
#  local_address :string(191)
#  phone_number  :string(191)
#  deleted_at    :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  picture       :string(191)
#

class Organization < ApplicationRecord
  concerned_with :flexible_attributes

  has_many :organization_sections
  has_many :organization_staffs, through: :organization_sections
  has_many :organization_devices, through: :organization_staffs
  has_many :users_organization_sections, through: :organization_sections
  has_many :users, through: :users_organization_sections

  mount_uploader :picture, UserPictureUploader

  INDUSTRIES = [
    INDUSTRY_NURSING_HOUSE = "nh".freeze,
    INDUSTRY_UNIVERSITY    = "univ".freeze,
  ].freeze

  INDUSTRY_NAMES = {
    INDUSTRY_NURSING_HOUSE => "介護施設".freeze,
    INDUSTRY_UNIVERSITY    => "大学".freeze,
  }.freeze

  accepts_nested_attributes_for :organization_sections,
                                :organization_staffs,
                                :organization_devices,
                                allow_destroy: true,
                                reject_if: :all_blank

  scope :nursing_houses, -> { where(industry: INDUSTRY_NURSING_HOUSE) }
  scope :universities,   -> { where(industry: INDUSTRY_UNIVERSITY) }
  scope :statistics, -> { where(statistics: true) }

  def nursing_house?
    self.industry === INDUSTRY_NURSING_HOUSE
  end

  def university?
    self.industry === INDUSTRY_UNIVERSITY
  end

  def industry_name
    INDUSTRY_NAMES[self.industry]
  end

  def name
    if has_attribute? "name_#{I18n.locale}"
      self.try(:send, "name_#{I18n.locale}")
    else
      self.try(:send, "name_#{I18n.default_locale}")
    end
  end

  def location
    jp_location = JpLocation.find_by_address(local_address)

    return nil if jp_location.nil?

    if I18n.locale.equal? :ja
      "#{jp_location.prefecture_ja}#{jp_location.city_ja}"
    else
      "#{jp_location.city_en}, #{jp_location.prefecture_en}"
    end
  end

  def picture_url
    picture.url
  end
end
