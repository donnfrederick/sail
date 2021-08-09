class ApplicationController < ActionController::Base
  # before_action :custom_http_headers

  if Rails.env.production?
    rescue_from Exception, with: :rescue_500
  end

  # for ActiveAdmin
  def update_last_sign_in_at
    if current_admin_user
      current_admin_user.update(last_sign_in_at: Time.zone.now)
    end
  end

  def set_admin_user_locale_and_timezone
    lang = request.env["HTTP_ACCEPT_LANGUAGE"].to_s.scan(/^[a-z]{2}/).first
    if lang == "ja"
      timezone = 'Asia/Tokyo'
    else
      lang = :en
      timezone = 'Asia/Bangkok'
    end

    if current_admin_user
      I18n.locale = current_admin_user.lang
      Time.zone   = current_admin_user.timezone
    else
      I18n.locale = lang
      Time.zone   = timezone
    end
  end

  def custom_http_headers
    # NOTE: AWS Configurationに下記の値を設定できないため、ハードコーディングしています
    security_headers = HTTPHeader::ContentSecurityPolicy.new
    security_headers.append("default", "'self' *.helte.jp *.sail.helte.jp wss:")
    security_headers.append("script",  "'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com *.googleapis.com")
    security_headers.append("style",   "* 'unsafe-inline' 'unsafe-eval'")
    security_headers.append("font",    "'self' data: fonts.gstatic.com")
    security_headers.append("img",     "* data:")
    security_headers.append("media",   "* data: blob:")
    security_headers.send(response)
  end

  private

  # TODO: Organizations::BaseController に移動するのが良さそう
  #
  # ユーティリティ的な関数処理をいろいろ定義している。
  # あるいは、共通作法を定義している。
  # ここでは属性やプロパティはいじらない。
  #

  # モデルへの適用のエラーメッセージを文字列へ形式化
  def error_messages_of(model)
    model.errors.full_messages.join(", ")
  end

  # 数字リストのうち空文字になっているものを除外したリスト
  def filtered_nums(unfiltered_nums)
    nums = []
    unfiltered_nums.each do |num|
      nums.push(num) if num.present?
    end
    nums
  end

  def rescue_500(exception)
    slack = Reports::Slack.new(request, exception: exception)
    slack.report

    render "errors/500", status: :internal_server_error, layout: "error"
  end
end
