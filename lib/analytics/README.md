# 統計データ
https://sail.helte.jp/admin/stats で、Sailの利用データを確認するための統計データ処理を行います。

## 構成
1. Rakeタスクで`analystics::*`のタスクを実行します
1. `analytics::*.update_all!`はすべての期間の統計データを集計し直します
1. `Analytics::*.each_data_at`が各期間について統計データを作成します
1. 統計データは`stats`テーブルにクラス名も併せて行ごとに保持します
1. https://sail.helte.jp/admin/stats を開きます
1. ページ上部のボタンで各データを切り替えて統計を確認します


## 統計を追加する
`lib/analytics`に下記のようにクラスファイルを作成します。

```rb
module Analytics
  class NewTask < InWeek
    def each_data_at(_type, start_at, end_at)
      # TODO: `start_at`から`end_at`までの期間における数値 (Integer)を返します
    end
  end
end
```

ファイルを作成したら、`lib/tasks/analytics.rb`に下記を追記します。

```rb
namespace :analysis do
  :
  : (省略)
  :
  desc "New task"
  task new_task:  :environment do
    weekly = Analytics::WeeklyStatsFactory.new
    analytics = Analytics::NewTask.new weekly
    analytics.update_all!
  end
end
```

※注意: Rakeタスク名と処理のクラス名は動的に関連付けられているわけではありませんが、同じ名前に統一することが好ましいです。

上記を追記したら、`config/schedule.rb`に下記を追記します。

```rb
every 1.days, at: '00:00 am' do
  :
  : (省略)
  :
  rake "analysis:conversation_schedules"
end
```

デプロイを行った場合は、下記をワーカーサーバーで実行し、Rakeタスクスケジュールを更新します。

```bash
# cd /var/app/current
# bundle exec whenever --update-crontab
```
