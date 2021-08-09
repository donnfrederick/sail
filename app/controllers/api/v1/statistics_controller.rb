module Api
  module V1
    class StatisticsController < ApiController
      skip_before_action :auth_with_token!

      def index
        render json: {
          people: {
            students: {
              all: Student.count,
            },
            teachers: {
              all: Teacher.count,
            },
            countries: {
              all: User.group(:country).count.size,
            }
          },
          organizations: {
            nursing_houses: Organization.nursing_houses.count,
            universities: Organization.universities.count,
          },
          conversations: {
            all: Conversation.count,
            done: Conversation.finished.count,
            open: Conversation.waiting.count,
          }
        }
      end

      def distribution
        render json: {
          conversations: {
            hourly: {
              open: Analytics::ConversationSchedules.open_hourly_distribution,
              matched: Analytics::ConversationSchedules.hourly_distribution,
            },
            weekly: {
              open: Analytics::ConversationSchedules.open_weekly_distribution,
              matched: Analytics::ConversationSchedules.weekly_distribution,
              weeks: {
                en: [
                  :sunday, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday
                ]
              }

            },
          }
        }
      end
    end
  end
end
