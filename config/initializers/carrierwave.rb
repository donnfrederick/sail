CarrierWave.configure do |config|
  if Rails.env.test? || ENV["AWS_S3_BUCKET"].blank?
    config.storage = :file
  else
    config.storage    = :aws
    config.aws_acl    = "public-read"
    config.aws_bucket = ENV["AWS_S3_BUCKET"]
    config.asset_host = ENV["AWS_S3_HOST"]

    config.aws_credentials = {
      access_key_id:     ENV["AWS_ACCESS_KEY"],
      secret_access_key: ENV["AWS_ACCESS_SECRET"],
      region:            ENV["AWS_REGION"],
      stub_responses:    Rails.env.test?,
    }
  end
end
