ActiveAdmin.register_page "Report" do

  menu false

  page_action :monthly_conversations, method: :get do
    respond_to do |format|
      format.html do
        year, month = if params[:year_month].present?
                        params[:year_month].split("-").map {|s| s.to_i }
                      else
                        Time.zone.now.to_a.slice(4, 2).reverse
                      end

        report_pdf = MonthlyConversationReportPdf.new(params[:id], year, month).render
        send_data report_pdf,
                  filename:    'monthly-conversations.pdf',
                  type:        'application/pdf',
                  disposition: 'inline' # 画面に表示
      end

    end
  end
end
