class ReportTable
  def self.create_columns(time, name, evaluation, country, comment)
    [
      {content: time, width: 75},
      {content: name, width: 120},
      {content: evaluation, width: 105},
      {content: country, width: 70},
      {content: comment, width: 145}
    ]
  end

  def self.create_center_columns(time, name, evaluation, country, comment)
    create_columns(time, name, evaluation, country, comment)
      .map {|column| column[:align] = :center; column }
  end

  def self.create_skipped_columns
    skip_mark = I18n.t("nh_report.table.skip")
    create_center_columns(skip_mark, skip_mark, skip_mark, skip_mark, "")
  end

  def self.create_empty_columns
    empty_mark = I18n.t("nh_report.table.empty")
    create_center_columns(empty_mark, empty_mark, empty_mark, empty_mark, "")
  end
end
