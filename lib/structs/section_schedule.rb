module Structs
  # ユーザーとそのスケジュールのペア構造
  class SectionSchedule
    def initialize
      @schedules = {}
    end

    def schedule_of(participant)
      if @schedules[participant.id].blank?
        @schedules[participant.id] = Schedule.new(participant)
      end
      @schedules[participant.id]
    end
  end
end
