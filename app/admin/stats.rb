ActiveAdmin.register_page "Stats" do
  menu priority: 98, label: "統計データ"
require 'benchmark'
  page_action :download, method: :get
  page_action :free_report, method: :post
  page_action :monthly_report, method: :get
  page_action :pdf_report, method: :post
  page_action :maidens_and_torpors_report, method: :post

  content do
    params[:q].present? ? q = params[:q] : q = 'overall'
    users = User.where(created_at: Time.now.ago(2.months)..Time.now)
    conversations = Conversation.where(created_at: Time.now.ago(2.months)..Time.now)
    issues = Issue.where.not(type: 'FreeIssue').where(created_at: Time.now.ago(2.months)..Time.now)

    render 'shared/stats', data: {q: q, users: users, conversations: conversations, issues: issues, cn: params[:cn]}
  end

  controller do
    def mau(type)
      Conversation.where(created_at: Time.now.last_month.beginning_of_day..Time.now.end_of_day).pluck(type).uniq.size
    end


    def percent(fraction,denominator)
      ((fraction.to_f * 100)/(denominator.to_f)).round(1)
    end

    def churn_rate(beginning,churn,gain)
      ((churn.size.to_f * 100)/(beginning.size.to_f + gain.size.to_f)).round(1)
    end

    def free_report
      csv_data = CSV.generate do |csv|
        csv << ['所属','ID','お名前','会話回数','予約キャンセル','会話時間','合計会話回数','合計会話時間']
        Organization.where(deleted_at: nil).includes(:users).each do |org|
          next if org.users.empty?
          org.users.each do |u|
            next if u.conversations.empty?
            all = u.conversations.select(:status, :start_at)
            cs = all.where(start_at: report_date[:start_at]..report_date[:end_at])
            cancels = 0
            if u.is_a?(Teacher)
              name = u.name_ja
              cancels = CancelledConversation.where(conversation_id: cs.ids).where(reason: 'teacher').size if cs.any?
            else
              name = u.name_en
              cancels = CancelledConversation.where(conversation_id: cs.ids).where(reason: 'student').size if cs.any?
            end
            csv << [org.name_ja,u.id,name,"#{cs.where(status: 'completed').size}回","#{cancels}回","#{cs.where(status: 'completed').size * 25}分","#{all.where(status: 'completed').size}回","#{all.where(status: 'completed').size * 25}分"]
          end
        end
      end
      csv_data = csv_data.encode(Encoding::SJIS, invalid: :replace, undef: :replace)
      send_data csv_data, type:'text/csv', filename: "free_report_#{report_date[:start_at].strftime('%Y%m%d')}_#{report_date[:end_at].strftime('%Y%m%d')}.csv"
    end

    def monthly_report
      users = User.all.where(created_at: Time.now.ago(7.months)..Time.now).includes(:issues)
      conversations = Conversation.all.where(start_at: Time.now.ago(7.months)..Time.now)
      issues = Issue.where.not(type: 'FreeIssue').where(created_at: Time.now.ago(7.months)..Time.now)
      csv_data = CSV.generate do |csv|
        csv << %w(時間 新規	新シニア 新学生 課金 MAU(シニア)/% MAU(学生)/% 予約 成功 キャンセル アンマッチ 一人当たり予約数 獲得数 離脱数 ChurnRate)
        6.times do |i|
          st = users.where(type: "Student").where(created_at: Time.now.ago(i.months).all_month)
          us1 = users.where(created_at: Time.now.ago(i.months).all_month).pluck(:type)
          us2 = users.where(created_at: Time.now.ago((i + 1).months).all_month).pluck(:type)
          convs1 = conversations.where(start_at: Time.now.ago((i).months).all_month)
          convs2 = conversations.where(start_at: Time.now.ago((i + 1).months).all_month)
          is1 = issues.where(created_at: Time.now.ago((i).months).all_month).pluck(:type)
          is2 = issues.where(created_at: Time.now.ago((i + 1).months).all_month).pluck(:type)
          begninning = issues.where('created_at < ?', Time.now.ago(i.months).beginning_of_month)
          churn = issues.where(expired_at: Time.now.ago(i.months).all_month)
          gain = issues.where(created_at: Time.now.ago(i.months).all_month)

          csv << [
            "#{Time.now.ago(i.months).all_month.to_s.gsub('00:00:00 +0900','').gsub('23:59:59 +0900','').strip}",
            "#{us1.size}(#{percent(us1.size,us2.size)}%)",
            "#{us1.count('Teacher')}(#{percent(us1.count('Teacher'),us2.count('Teacher'))}%)",
            "#{us1.count('Student')}(#{percent(us1.count('Student'),us2.count('Student'))}%)",
            "#{is1.size}(#{percent(is1.size,is2.size)}%)",
            "#{convs1.pluck(:teacher_id).uniq.count}(#{percent(convs1.pluck(:teacher_id).uniq.count,convs2.pluck(:teacher_id).uniq.count)}%)",
            "#{convs1.pluck(:student_id).uniq.count}(#{percent(convs1.pluck(:student_id).uniq.count,convs2.pluck(:student_id).uniq.count)}%)",
            "#{convs1.size}",

            "#{convs1.where(status: 'completed').size}(#{percent(convs1.where(status: 'completed').size,convs1.size)}%)",
            "#{convs1.where(status: 'cancled').size}(#{percent(convs1.where(status: 'cancled').size,convs1.size)}%)",
            "#{convs1.where(student_id: nil).size}(#{percent(convs1.where(student_id: nil).size,convs1.size)}%)",
            "シニア #{(convs1.size.to_f / convs1.pluck(:teacher_id).uniq.size.to_f).round(1)} 学生 #{(convs1.where.not(student: nil).size.to_f / convs1.pluck(:student_id).uniq.size.to_f).round(1)}",
            "#{st.where(issues: {type: 'StripeIssue'}).size}(#{((st.where(issues: {type: 'StripeIssue'}).size.to_f) * 100 / st.size.to_f).round(1)}%)",
            "#{churn.size}",
            "#{churn_rate(begninning,churn,gain)}%"
          ]
        end
      end
      csv_data = csv_data.encode(Encoding::SJIS, invalid: :replace, undef: :replace)
      send_data csv_data, type:'text/csv', filename: "monthly_report_#{Time.now.strftime('%Y%m%d')}.csv"
    end

    def download
      respond_to do |format|
        format.html do
          selected_name = params[:name]
          class_name = selected_name.split("/").map {|s| s.camelize }.join("::")
          factory = Analytics::WeeklyStatsFactory.new
          statistics = eval("::#{class_name}.new(factory)")

          row = %w[No. Start End]
          row += statistics.columns.map do |column|
            "#{column}"
          end

          rows = [row]
          rows += Stat.where(name: selected_name).order(nth: :desc).map do |stat|
            list = [
              "#{stat.term[0]}#{stat.nth}",
              "#{I18n.l(stat.start_at.in_time_zone(current_admin_user.timezone), locale: current_admin_user.lang, format: :long_date)}",
              "#{I18n.l(stat.end_at.in_time_zone(current_admin_user.timezone), locale: current_admin_user.lang, format: :long_date)}",
            ]
            list += JSON.parse(stat.data).map {|v| "#{v}" }
            list.join(", ")
          end

          send_data rows.join("\n").encode("Shift_JIS"),
                    filename:    "#{params[:name]}.csv",
                    type:        'text/csv',
                    disposition: 'inline' # 画面に表示
        end
      end
    end

    #以下は無料レポート暫定CSV対応用です。顧客展開が終わったら削除してください。

    def pdf_report
      file_name = "pdf_#{Time.new.strftime("%d%H%M")}.pdf"
      emails = CSV.table(params[:import_file].path)[:email].map(&:strip).map{|m| Student.encrypt_email(m)}
      students = Student.where(encrypted_email: emails)
      start_date = report_date[:start_at]
      end_date = report_date[:end_at] + 60*60*24-1
      pdf = Prawn::Document.new({ page_size: 'A4', page_layout: :portrait, margin: 20}){
        font_families.update('standard' => { normal: "#{Rails.root}/assets/fonts/ipaexm.ttf", bold: "#{Rails.root}/assets/fonts/ipaexg.ttf"})
        font 'standard'
        headers = ["No", "ID", "お名前", "会話回数", "予約キャンセル", "会話時間", "合計会話回数", "合計会話時間", '開始日']
        client_name = "#{students.first.organizations.first.name_ja}"
        report_title = '会話状況のレポート〜学習者の方々〜'
    
    
        #data = []#テーブルを作成する為、二次配列でお願いいたします。
        data = Array.new
        data << headers
        students.each.with_index(1) do |s,i|
          conversations_select_date = s.conversations.where(start_at: start_date..end_date).where(status: 'completed').size
          cancelled_by_student = CancelledConversation.where(start_at:  start_date..end_date).where(student_id: s.id).where(reason: 'student').size
          total_conversation_size = s.conversations.where('start_at <= ?', end_date).where(status: 'completed').size
          rows = [i, s.id, s.name_en, "#{conversations_select_date}回", "#{cancelled_by_student}回", "#{conversations_select_date * 25}分",
          "#{total_conversation_size}回", "#{total_conversation_size * 25}分", s.created_at.strftime("%Y年%-m月")]
          data << rows
        end
        #header
        text_box "#{client_name} 御中", at: [50, 770], size:10#destination
        text_box report_title, at: [0, 730], size:12, :align => :center#subtitle
        text_box "対象期間：#{start_date.strftime("%m月%d日")}〜#{end_date.strftime("%m月%d日")}", at: [30, 700], size: 8#tarm
        image "#{Rails.root}/public/img/sail_report_logo.png", at: [450, 730], width: 60
        #table
        # bounding_box([30,690], :width=>490){table(data,
        #   :header => true,
        #   :column_widths => [20,70,100,60,60,60,60,60]
        bounding_box([30,690], :width=>510){table(data,
          :header => true,
          :column_widths => [20,45,95,60,60,60,60,60,50]
          # :column_widths => [20,35,130,50,60,50,60,60,45]
          ) do |t|
            t.columns(0..2).style :align => :center
            t.columns(3..7).style :align => :right
            #table-header
            t.rows(0).font_style = :bold
            t.rows(0).text_color = "ffffff"
            t.rows(0).style :align => :center, :background_color => "0000ff",height: 20
            #table-main
            0..data.length.times do |r|
              t.row(r).height=20
              t.row(r).style size: 7
            end
          end
        }
          #footer
          start_new_page if y <= 70
          footer_line = 50
          helte = '株式会社Helte'
          helte_adress = '千葉県柏市東上町 2-28 第一水戸屋ビル3F'
          helte_email = 'sales@helte-corp.com'
          text_box "#{helte}  #{helte_adress}  #{helte_email}", at: [75, footer_line], size: 10
          image "#{Rails.root}/public/img/helte.png", at:[475, footer_line + 20], width: 60
      }
      send_data pdf.render,
      filename: "#{students.first.organizations.first.name_ja}様_#{start_date.strftime("%m月%d日")}〜#{end_date.strftime("%m月%d日")}_レポート",
      type: "application/pdf"
    end

    def maidens_and_torpors_report
      index = 1
      time = Time.now
      users = User.includes(:pairs_from, :students_conversations, :teachers_conversations).where(created_at: report_date[:start_at]..report_date[:end_at]).where.not(created_at: time.last_month..time)
      paid_users_ids = Issue.where(expired_at: time..Float::INFINITY).where.not(type: 'FreeIssue').pluck(:user_id)
      not_torpor_teacher_ids = Conversation.where(created_at: time.last_month..time).pluck(:teacher_id)
      not_torpor_student_ids = Conversation.where(created_at: time.last_month..time).pluck(:student_id)
      report = CSV.generate do |csv|
        csv << ['No.', 'ユーザー', '国', 'タイプ', 'id', 'name', 'email', 'BAN', '課金者', 'expired_at', 'conversations']
        users.find_each do |user|
          ban = "ban" if user.ban?
          paid = user.id if paid_users_ids.include?(user.id)
          if user. conversations.empty?
            is_maiden_or_torpor = "Maiden"
          elsif not_torpor_teacher_ids.include?(user.id) || not_torpor_student_ids.include?(user.id)
            next
          else
            is_maiden_or_torpor = "Torpor"
          end
          csv << [
            index,
            user.type,
            ISO3166::Country[user.country].translated_names[1],
            is_maiden_or_torpor,
            user.id,
            user.name,
            user.email,
            ban,
            paid,
            expiration_date[:expired_at],
            params[:add_conversations],
          ]
          index = index + 1
        end
      end
      report.encode!(Encoding::SJIS,invalid: :replace, undef: :replace)
      send_data report, type:'text/csv', filename: "maindens_and_torpors_report_#{Time.now.strftime('%Y%m%d')}.csv"
    end

    private
    def report_params
      params.permit(:start_at, :end_at, :country, :add_conversations, :expired_at, :utf8, :authenticity_token, :commit)
    end

    def report_date
      date = report_params
      {
        start_at: (Time.new date["start_at(1i)"].to_i,date["start_at(2i)"].to_i,date["start_at(3i)"].to_i),
        end_at: (Time.new date["end_at(1i)"].to_i,date["end_at(2i)"].to_i,date["end_at(3i)"].to_i)
      }
    end

    def expiration_date
      date = report_params
      {
      expired_at: (Time.new date["expired_at(1i)"].to_i,date["expired_at(2i)"].to_i,date["expired_at(3i)"].to_i)
      }
    end
  end
end
