namespace :pair do

  desc "ペア設定を解除する"
  task :clear_all, [:user_id] => :environment do |_task, args|
    Pair.where(from_user_id: args[:user_id]).each do |pair|
      pair.delete
    end
  end

  desc "ペア設定を解除する"
  task :clear, [:from_user_id, :to_user_id] => :environment do |_task, args|
    pair = Pair.where(from_user_id: args[:from_user_id], to_user_id: args[:to_user_id]).first
    pair.delete if pair.present?
  end

  desc "ペア設定を行う"
  task :set, [:from_user_id, :to_user_id] => :environment do |_task, args|
    pair = Pair.new({ from_user_id: args[:from_user_id], to_user_id: args[:to_user_id] })
    pair.save
  end

  desc "特定のタイムゾーンのユーザーとのみペア設定を行う"
  task :set_by_timezone, [:user_id, :type, :timezone] => :environment do |_task, args|
    users = if args[:type] == "student"
              Student
            elsif args[:type] == "teacher"
              Teacher
            else
              nil
            end

    unless users.nil?
      users.where(timezone: args[:timezone]).each do |user|
        pair = Pair.new({ from_user_id: args[:user_id], to_user_id: user.id })
        pair.save
      end
    end
  end

  desc "特定のタイムゾーンのユーザーとのみペア設定を解除する"
  task :clear_by_timezone, [:user_id, :type, :timezone] => :environment do |_task, args|
    users = if args[:type] == "student"
              Student
            elsif args[:type] == "teacher"
              Teacher
            else
              nil
            end

    unless users.nil?
      users.where(timezone: args[:timezone]).each do |user|
        pair = Pair.where(from_user_id: args[:user_id], to_user_id: user.id).first
        pair.delete if pair.present?
      end
    end
  end

  desc "特定のユーザーをバンする"
  task :ban, [:user_id] => :environment do |_task, args|
    Pair.where(from_user_id: args[:user_id]).each do |pair|
      pair.delete
    end

    pair = Pair.new({ from_user_id: args[:user_id], to_user_id: 1 })
    pair.save
  end

end
