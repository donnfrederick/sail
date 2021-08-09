ActiveAdmin.register_page "Video" do

  menu false

  content do
    video_chunk = VideoChunk.find(params[:id])
    teacher = link_to video_chunk.conversation.teacher.name_ja, admin_teacher_path(video_chunk.conversation.teacher)
    student = link_to video_chunk.conversation.student.name_en, admin_student_path(video_chunk.conversation.student)

    html  = "<h3>#{I18n.t("active_admin.video.title", teacher_name: teacher, student_name: student, start_at: video_chunk.start_at.to_s)}</h3>"
    html += "<video src=\"#{video_chunk.s3_url}\" controls autoplay=\"true\"></video>"
    html += "<div><a href=\"#{video_chunk.s3_url}\">#{I18n.t("active_admin.video.buttons.download")}</a></div>"
    raw html
  end

  action_item I18n.t("active_admin.video.buttons.back") do
    video_chunk = VideoChunk.find(params[:id])
    link_to I18n.t("active_admin.video.buttons.back"), admin_conversation_path(video_chunk.conversation)
  end
end
