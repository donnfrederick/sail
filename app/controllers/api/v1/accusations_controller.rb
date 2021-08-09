module Api
  module V1
    class AccusationsController < ApiController
      validates :create do
        integer :conversation_id, required:    true,
                                  strong:      true,
                                  description: "conversation.id"

        integer :user_id, required:    true,
                          description: "対象ユーザーの user.id"

        integer :accusation_reason_id, only: [1, 2, 3, 4, 5], # TODO ハードコーディングをやめる
                                       required:    true,
                                       strong:      true,
                                       description: "通報理由\n1: 他サービスへの勧誘行為, 2: スパム・宣伝目的, 3: 出会い・わいせつ目的, 4: 犯罪・違法行為, 5: その他、迷惑行為"
      end

      def reasons
        render json: AccusationReason.all
      end

      def create
        accusation = Accusation.new(permitted_params)
        accusation.from_user_id = current_user.id
        accusation.to_user_id   = params[:user_id]

        if accusation.save
          render json: accusation, status: :created
        else
          Rails.logger.error accusation.errors.full_messages
          render_error(accusation.errors.full_messages, :unprocessable_entity)
        end
      end
    end
  end
end
