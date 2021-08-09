module Analytics
  class StudentRegistrants < Registrants
    def each_data_at(_type, start_at, end_at)
      Student.statistics.where("created_at >= ?", start_at).where("created_at <= ?", end_at).count
    end
  end
end
