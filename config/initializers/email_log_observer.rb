class EmailLogObserver
  def delivered_email(email)
    Rails.logger.info email
  end
end
