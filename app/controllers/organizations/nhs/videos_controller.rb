module Organizations
  module Nhs
    # 録画した会話のビデオについてのページの処理を実装します。
    class VideosController < Organizations::Users::VideosController
      include Concerns::Language
      include Concerns::Industries
      include Concerns::Nhs

      # 録画された童顔の再生ページ
      def play
        # TODO
      end
    end
  end
end
