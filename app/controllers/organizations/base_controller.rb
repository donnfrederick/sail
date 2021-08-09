module Organizations
  #
  # 管理ページの基本処理を実装したコントローラーです。
  # 管理ページとして機能するコントローラーは基本的にこのクラスを継承してください。
  #
  class BaseController < ApplicationController
    layout "organization"

    before_action :auth_with_session!
    skip_before_action :auth_with_session!, only: [:signin]

    before_action :url

    include ::Organizations::Concerns::Authenticator

    #
    # 現在アクセスしているURLについての情報をビューでも扱えるように
    # コントローラーの属性として持ちます。
    def url
      @url = {
        fullpath: request.fullpath,
        root: request.protocol + request.host_with_port,
        path: request.path,
      }
    end
  end
end
