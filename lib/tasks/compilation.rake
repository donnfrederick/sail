namespace :compilation do

  desc "動画エンコードのキューを処理する"
  task invoke_queue: :environment do
    if Videos::Compilation.idling?
      compilation_queue = Videos::Compilation.next_queue
      compilation_queue.execute if compilation_queue.present?
    end
  end

end
