module Analytics
  class TeacherRegistrants < Registrants
    def each_data_at(_type, start_at, end_at)
      Teacher.statistics.where("created_at >= ?", start_at).where("created_at <= ?", end_at).count
    end
  end
end
