module PathHelper
  def asset_path(relative_path)
    ENV["APP_SERVICE_HOST"] + "/assets/#{relative_path}"
  end

  def img_path(relative_path)
    asset_path("img/" + relative_path)
  end
end
