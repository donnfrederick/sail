# bin/rails runner "Transfers::ExportTsv.export"

class Transfers::ExportTsv
  DB_NAME    = "sail_old"
  EXPORT_DIR = Rails.root.join("db/transfers/").to_s

  def self.export
    stdout = `mysql -uroot #{DB_NAME} -e "SHOW TABLES;"`
    table_names = stdout.split("\n") - ["Tables_in_#{DB_NAME}"]
    
    `mkdir -p #{EXPORT_DIR}`

    table_names.each do |table_name|
      `mysql -uroot #{DB_NAME} -e "SELECT * FROM #{table_name}" > #{File.join(EXPORT_DIR, "#{table_name}.tsv")}`
    end
  end
end
