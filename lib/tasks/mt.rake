namespace :mt do
  desc '現在のMemoを抽出します'
  task export_memos: :environment do
    CSV.open('./memos.csv', 'w', headers: true) do |csv|
      csv << ['conversation_id','start_at','teacher_id','teacher_name','teacher_memo','student_id','student_name','student_memo']
      conversations = Conversation.includes(:teacher).includes(:student)
      conversations.each do |c|
        next if c.teacher_memo.nil? && c.student_memo.nil?
        puts "working on #{c.id}"
        csv << [c.id,c.start_at.strftime('%Y/%m/%d %H:%M'),c.teacher_id,c.teacher.try(:name),c.teacher_memo,c.student_id,c.student.try(:name),c.student_memo]
      end
    end
  end

  desc 'ここ一年の戦略レポートを出します。'
  task tactical_report: :environment do
    def percent(fraction,denominator)
      ((fraction.to_f * 100)/(denominator.to_f)).round(1)
    end
    users = User.all.where(created_at: Time.now.ago(13.months)..Time.now).includes(:issues)
    conversations = Conversation.all.where(start_at: Time.now.ago(13.months)..Time.now)
    issues = Issue.where.not(type: 'FreeIssue').where(created_at: Time.now.ago(13.months)..Time.now)
    CSV.open('./tactical_report.csv', 'w', headers: true) do |csv|
      csv << %w(時間 新規	新シニア 新学生 課金 MAU(シニア) MAU(学生) 予約 成功 キャンセル アンマッチ 一人当たり予約数 獲得数 離脱数)
      13.times do |i|
        st = users.where(type: "Student").where(created_at: Time.now.ago(15.months)..Time.now.ago(i.months))
        us = users.where(created_at: Time.now.ago(15.months)..Time.now.ago(i.months)).pluck(:type)
        convs = conversations.where(start_at: Time.now.ago((i).months).all_month)
        is = issues.where(created_at: Time.now.ago(15.months)..Time.now.ago((i).months)).pluck(:type)
        begninning = issues.where('created_at < ?', Time.now.ago(i.months).beginning_of_month)
        churn = issues.where(expired_at: Time.now.ago(i.months).all_month)
        gain = issues.where(created_at: Time.now.ago(i.months).all_month)

        csv << [
          "#{Time.now.ago(i.months).all_month.to_s.gsub('00:00:00 +0900','').gsub('23:59:59 +0900','').strip}",
          "#{us.size}",
          "#{us.count('Teacher')}",
          "#{us.count('Student')}",
          "#{is.size}",
          "#{convs.pluck(:teacher_id).uniq.count}",
          "#{convs.pluck(:student_id).uniq.count}",
          "#{convs.size}",
          "#{convs.where(status: 'completed').size}(#{percent(convs.where(status: 'completed').size,convs.size)}%)",
          "#{convs.where(status: 'cancled').size}(#{percent(convs.where(status: 'cancled').size,convs.size)}%)",
          "#{convs.where(student_id: nil).size}(#{percent(convs.where(student_id: nil).size,convs.size)}%)",
          "シニア #{(convs.size.to_f / convs.pluck(:teacher_id).uniq.size.to_f).round(1)} 学生 #{(convs.where.not(student: nil).size.to_f / convs.pluck(:student_id).uniq.size.to_f).round(1)}",
          "#{gain.size}",
          "#{churn.size}"
        ]
      end
    end
  end

  desc "各国の処女メンバーを抽出します"
  task generate_maidens: :environment do
    CSV.open('./all_maidens.csv', 'w', headers: true) do |csv|
      csv << ['id','country','name_en','email']
      Student.all.pluck(:country).uniq.each do |c|
        Student.includes(:students_conversations).where(country: c).where(conversations: {id: nil}).each do |s|
          csv << [s.id,c,s.name_en,s.email]
        end
      end
    end
  end

  desc '全てのパッケージをCSVに落とします'
  task pricingtable_to_csv: :environment do
    @packages = PricingTable.all
    CSV.open('./pricingtable.csv', 'w', headers: true) do |csv|
      csv << PricingTable.column_names
      @packages.each do |package|
        csv << package.attributes.values
      end
    end
  end
end