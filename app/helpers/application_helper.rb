module ApplicationHelper
  def webview?
    regexp = %r{sail/iOS|sail/Android}
    request.headers["HTTP_USER_AGENT"].present? && request.headers["HTTP_USER_AGENT"].match(regexp).present?
  end

  def android?
    regexp = %r{Android}
    request.headers["HTTP_USER_AGENT"].present? && request.headers["HTTP_USER_AGENT"].match(regexp).present?
  end

  def ios?
    regexp = %r{iPhone|iPad|iPod}
    request.headers["HTTP_USER_AGENT"].present? && request.headers["HTTP_USER_AGENT"].match(regexp).present?
  end

  def webview_version
    return unless webview?

    regexp = /sail\/(Android|iOS).*\/([0-9\.]+)$/
    matches = request.headers["HTTP_USER_AGENT"].present? ? request.headers["HTTP_USER_AGENT"].match(regexp) : nil
    if matches
      matches[2].split(".").map(&:to_i).reverse.each_with_index.inject(0) {|sum, (v, i)| sum += 1000**i*v }
    end
  end

  # application.js の digest を取得する
  # デプロイ毎のバージョンとしてキャッシュ対策に使用
  def application_digest
    target = "application.js"
    if Rails.application.assets
      Rails.application.assets.find_asset(target).try(:digest)
    else
      filename = Rails.application.assets_manifest.assets["application.js"]
      filename.match(/\Aapplication-(\w+)\.js\Z/).try(:captures).try(:first)
    end
  end

  # ファイルのダイジェスト文字列
  def asset_file_digest(file)
    target = Rails.root.join("public/assets/" + file).to_path
    file_content = File::read(target)
    Digest::MD5.hexdigest(file_content)
  end

  # ディプロイ毎のダイジェスト文字列
  def deployment_digest
    target = Rails.root.join("Gemfile").to_path
    deployed_at = File::Stat.new(target).ctime
    Digest::MD5.hexdigest(deployed_at.to_s)
  end

  # TODO: Organizations::BaseHelper に移動するのが良さそう
  def qrcode_tag(text, options = {})
    ::RQRCode::QRCode.new(text).as_svg(options).html_safe
  end

  # TODO: Organizations::BaseHelper に移動するのが良さそう
  def small_photo(picture)
    if picture.small.url.present?
      picture.small.url
    else
      "/assets/img/common/user.png"
    end
  end

  # TODO: Organizations::BaseHelper に移動するのが良さそう
  def small_user_photo(user)
    small_photo(user.picture)
  end

  def js_file_path(file_name)
    if Rails.env.development?
      '/assets/js/' + file_name + '?v=' + asset_file_digest('js/' + file_name)
    else
      'https://sail-production-assets.s3-ap-northeast-1.amazonaws.com/js/' + file_name
    end
  end

end
