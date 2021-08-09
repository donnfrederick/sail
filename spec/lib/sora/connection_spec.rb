require "rails_helper"

RSpec.describe ::Sora::Connection do
  let(:dummy_class) do
    class DummyClass
      attr_accessor :body
    end
    DummyClass.new
  end
  let(:dummy_json) do
    '[{"audio":{"codec_type":"OPUS"},"channel_id":"926b8e9f-24fb-49df-9abd-bf04ca577009",
    "client_id":"6YSHQTHFF90E3DNK7BH92PDRTG","connection_id":"6YSHQTHFF90E3DNK7BH92PDRTG",
    "minutes":0,"multistream":true,"role":"upstream","video":{"bit_rate":500,"codec_type":"VP9"}}]'
  end
  let(:channel_id) { 'channel_id' }
  
  describe '#self.request_connection_peers' do
    subject{ ::Sora::Connection.request_connection_peers(channel_id) }
    context '正常系' do 
      before do
        dummy_class.body = dummy_json
        allow(::Sora::Connection).to receive(:post_api)
          .with("ListChannelClients", "20170814", {channel_id: channel_id})
          .and_return(dummy_class)
      end
      it '戻り値が[::Sora::ChannelClient]であること' do 
        # bestな比較方法ではないが...
        expect(subject.first.class == ::Sora::ChannelClient.new({}).class).to be_truthy
      end
    end

    context '異常系' do
      context 'JSON.parseでエラーが起きた場合' do
        before do 
          dummy_class.body = 'not json'
          allow(::Sora::Connection).to receive(:post_api)
            .with("ListChannelClients", "20170814", {channel_id: channel_id})
            .and_return(dummy_class)
        end
        it 'rescueしnilを返す' do  
          is_expected.to be nil
        end
      end

      context 'post_apiでエラーが起きた場合' do 
        before do 
          allow(::Sora::Connection).to receive(:post_api)
          .with("ListChannelClients", "20170814", {channel_id: channel_id})
          .and_raise('dummy')
        end
        it 'rescueしnilを返す' do
          is_expected.to be nil
        end
      end
    end
  end
end
