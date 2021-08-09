class SiteConfig < ApplicationRecord
  belongs_to :admin_user

  FORMATS = [
    FORMAT_STRING   = 0,
    FORMAT_INT      = 1,
    FORMAT_LIST     = 10,
    FORMAT_INT_LIST = 11,
  ]

  FORMAT_NAMES = {
    FORMAT_STRING   => "文字列".freeze,
    FORMAT_INT      => "数値".freeze,
    FORMAT_LIST     => "リスト".freeze,
    FORMAT_INT_LIST => "数値リスト".freeze,
  }

  def self.find_by_keyword(keyword, default_value = nil)
    find_record_by_keyword(keyword).try(:content) || default_value
  end

  def self.find_by_keyword!(keyword)
    find_record_by_keyword!(keyword).content
  end

  def self.find_record_by_keyword(keyword)
    find_by(keyword: keyword)
  end

  def self.find_record_by_keyword!(keyword)
    find_by!(keyword: keyword)
  end

  def self.update_content!(content)
    update(content: content)
  end
end
