module ActiveAdmin::StatsHelper
  def countries
    Student.pluck(:country).uniq
  end 

  def mau(type)
    Conversation.where(start_at: Time.now.last_month.beginning_of_day..Time.now.end_of_day).pluck(type).uniq.size
  end

  def topics
    %w(overall countries timerange)
  end

  def overall_headers
    %w(新規 新シニア(EU) 新学生(EU) 課金 予約 成功 キャンセル アンマッチ 一人当たり予約数)
  end

  def timerange_headers
    %w(予約 成功 キャンセル アンマッチ)
  end

  def chart_data(users)
    users = users.where(created_at: Time.now.last_month..Time.now)
    users.group_by{|user| user.created_at.to_date}.map {|m| [m[0],m[1].size]}
    # @data = []
    # @start = Time.now.last_month
    # 34.times do |i|
    #   break if @start.today?
    #   if cn.nil?
    #     @data << [@start,Student.where('created_at < ?', @start).size]
    #   else
    #     @data << [@start,Student.where(country: cn).where('created_at < ?', @start).size]
    #   end
    #   @start = @start.tomorrow
    # end
    # return @data
  end

  def timerange_hash(conversations)
    hash = {}
    24.times do |i|
      hash.store(format('%02d:', i), detail: {total: 0, completed: 0, cancled: 0, unmatched: 0, queued: 0, waiting: 0})
    end
    conversations.pluck(:start_at, :status).each do |c|
      hash[format('%02d:',c[0].hour)][:detail][:total] = hash[format('%02d:',c[0].hour)][:detail][:total] + 1
      hash[format('%02d:',c[0].hour)][:detail][c[1].to_sym] = hash[format('%02d:',c[0].hour)][:detail][c[1].to_sym] + 1
    end
    return hash
  end

  def str_week(i)
    Time.now.ago(i.weeks).all_week.to_s.gsub('00:00:00 +0900','').gsub('23:59:59 +0900','').strip
  end

  def percent(fraction,denominator)
    ((fraction.to_f * 100)/(denominator.to_f)).round(1)
  end

  def groth_rate(now,before)
    (((now.to_f - before.to_f) * 100)/before.to_f).round(1)
  end

  def status_rate(conversations, status)
    ((conversations.where(status: status).size.to_f * 100)/(conversations.size.to_f)).round(1)
  end
end