ActiveAdmin.register_page "VolunteerCosts" do
  menu parent: "GroupConfigs", priority: 99, label: "有償ボランティアへの支払い"

  page_action :download, method: :get

  content do
    params[:i].nil? ? i = 0 : i = params[:i].to_i
    volunteers = OrganizationSection.find(69).users.includes(:teachers_conversations)
    h3 "#{Time.now.ago(i.months).strftime('%Y/%m')}"

    div link_to '先月', "/admin/volunteercosts/?i=#{i + 1}"
    div link_to '次月', "/admin/volunteercosts/?i=#{i - 1}"
    h3 "total #{volunteers.map {|v| v.conversations.where(start_at: Time.now.ago(i.months).all_month).finished.where(teacher_online_status: ["Ontime", "Late"]).size * 200}.sum.to_s(:delimited)}"

    table_for volunteers do
      column :name
      column('合計会話') do |v|
        v.conversations.where(start_at: Time.now.ago(i.months).all_month).finished.size
      end
      column('出席') do |v|
        v.conversations.where(start_at: Time.now.ago(i.months).all_month).finished.where(teacher_online_status: ["Ontime", "Late"]).size
      end
      column('欠席') do |v|
        v.conversations.where(start_at: Time.now.ago(i.months).all_month).finished.where(teacher_online_status: ["Absent"]).size
      end
      column('お支払い') do |v|
        v.conversations.where(start_at: Time.now.ago(i.months).all_month).finished.where(teacher_online_status: ["Ontime", "Late"]).size * 200
      end
    end 
    div link_to 'download', admin_volunteercosts_download_path(i: i)
  end

  controller do
    def download
      i = params[:i].to_i
      csv_data = CSV.generate do |csv|
        csv << ['名前','合計回数','出席','欠席','お支払い']
        OrganizationSection.find(69).users.includes(:teachers_conversations).each do |v|
          csv << [
            v.name,
            v.conversations.where(start_at: Time.now.ago(i.months).all_month).finished.size,
            v.conversations.where(start_at: Time.now.ago(i.months).all_month).finished.where(teacher_online_status: ["Ontime", "Late"]).size,
            v.conversations.where(start_at: Time.now.ago(i.months).all_month).finished.where(teacher_online_status: ["Absent"]).size,
            v.conversations.where(start_at: Time.now.ago(i.months).all_month).finished.where(teacher_online_status: ["Ontime", "Late"]).size * 200,
          ]
        end
      end
      csv_data = csv_data.encode(Encoding::SJIS, invalid: :replace, undef: :replace)
      send_data csv_data, type:'text/csv', filename: "volunteer_payment_#{Time.now.ago(i.months).strftime('%Y/%m')}.csv"
    end
  end
end
