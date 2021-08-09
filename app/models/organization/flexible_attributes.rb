class Organization
  def assign_picture=(data)
    return if data.blank?

    self.picture = if data.is_a? ActionDispatch::Http::UploadedFile
                     data
                   else
                     StringFileIO.from_base64(data)
                   end
  end
end
