require "rails_helper"

RSpec.describe Webhook::V1::SoraController, type: :request do
  let(:user) { create :teacher }
  let(:partner) { create :student }
  let(:conversation) {
    create :conversation, :skip_validate, teacher: user, student: partner
  }
  let(:created_json) {
    {
       "channel_id": conversation.channel_id,
       "client_id":"9d17ce24-5aa9-4298-9b46-5e502615bc2c",
       "data":{
          "audio":{
             "codec_type":"OPUS"
          },
          "channel_connections":2,
          "channel_downstream_connections":1,
          "channel_upstream_connections":2,
          "minutes":0,
          "total_received_bytes":0,
          "total_sent_bytes":0,
          "video":{
             "bit_rate":500,
             "codec_type":"VP9"
          }
       },
       "id":"5710e0fc-348b-458f-addd-ce2bb5d166b6",
       "label":"WebRTC SFU Sora",
       "multistream":false,
       "role":"upstream",
       "timestamp":"2017-08-13T07:08:14.346280Z",
       "type":"connection.created",
       "version":"17.08.0"
    }
  }
  let(:report_json) {
    {
        "channel_id": conversation.channel_id,
        "data": {
            "archives": [
                {
                    "client_id": "4bfeec1c-61b8-475e-a58b-8b36f0b43fed",
                    "file_path": "\/home\/centos\/sora\/recorded\/d179fa5b-aaf3-4b37-9687-3153395175ca.webm",
                    "filename": "d179fa5b-aaf3-4b37-9687-3153395175ca.webm",
                    "metadata_file_path": "\/home\/centos\/sora\/recorded\/d179fa5b-aaf3-4b37-9687-3153395175ca.json",
                    "metadata_filename": "d179fa5b-aaf3-4b37-9687-3153395175ca.json",
                    "size": 23065086,
                    "start_time_offset": 863,
                    "stop_time_offset": 1480
                },
                {
                    "client_id": "6a322981-3335-440a-a373-edb3cb72f130",
                    "file_path": "\/home\/centos\/sora\/recorded\/9c993850-83d2-49c4-9764-4b512962c56c.webm",
                    "filename": "9c993850-83d2-49c4-9764-4b512962c56c.webm",
                    "metadata_file_path": "\/home\/centos\/sora\/recorded\/9c993850-83d2-49c4-9764-4b512962c56c.json",
                    "metadata_filename": "9c993850-83d2-49c4-9764-4b512962c56c.json",
                    "size": 56213889,
                    "start_time_offset": 34,
                    "stop_time_offset": 1474
                },
                {
                    "client_id": "4c5dac8f-8e1d-482f-9839-73cd4a3459ad",
                    "file_path": "\/home\/centos\/sora\/recorded\/39c7da9e-9817-4e3b-a661-1b0758089d04.webm",
                    "filename": "39c7da9e-9817-4e3b-a661-1b0758089d04.webm",
                    "metadata_file_path": "\/home\/centos\/sora\/recorded\/39c7da9e-9817-4e3b-a661-1b0758089d04.json",
                    "metadata_filename": "39c7da9e-9817-4e3b-a661-1b0758089d04.json",
                    "size": 308299,
                    "start_time_offset": 23,
                    "stop_time_offset": 32
                },
                {
                    "client_id": "bed8bef0-d69b-4068-92cc-20ccbfed30e0",
                    "file_path": "\/home\/centos\/sora\/recorded\/74542716-f270-4906-885c-c319cf3a03ce.webm",
                    "filename": "74542716-f270-4906-885c-c319cf3a03ce.webm",
                    "metadata_file_path": "\/home\/centos\/sora\/recorded\/74542716-f270-4906-885c-c319cf3a03ce.json",
                    "metadata_filename": "74542716-f270-4906-885c-c319cf3a03ce.json",
                    "size": 1066240,
                    "start_time_offset": 0,
                    "stop_time_offset": 21
                }
            ],
            "channel_id": "8768e42f-107a-4d30-b2a3-ad5263d72989",
            "created_at": 1542778217,
            "id": "f9f9aef1-3981-4de4-a17d-c7bf198115ca",
            "metadata_file_path": "\/home\/centos\/sora\/recorded\/f9f9aef1-3981-4de4-a17d-c7bf198115ca.json",
            "metadata_filename": "f9f9aef1-3981-4de4-a17d-c7bf198115ca.json"
        },
        "id": "115ecb1d-a195-4e9e-81d4-b356e47cb99e",
        "label": "WebRTC SFU Sora 6",
        "timestamp": "2018-11-21T05:55:17.013437Z",
        "type": "recording.report",
        "version": "18.04.11"
    }
  }

  describe "POST /webhook/v1/sora/connection.json" do
    context "when is created successfully" do
      before(:each) do
        post "/webhook/v1/sora/connection.json",
          headers: { "Content-Type" => "application/json" },
          params: created_json.to_json
      end

      it "returns block resource", autodoc: true do
        expect(response.status).to eq 201
      end
    end

    context "when is invalid channel_id" do
      let(:invalid_json) { created_json.merge("channel_id": "invalid_channel_id") }
      before(:each) do
        post "/webhook/v1/sora/connection.json",
          headers: { "Content-Type" => "application/json" },
          params: invalid_json.to_json
      end

      it "returns block resource" do
        expect(response.status).to eq 204
      end
    end

    context "when is not enough connections" do
      let(:invalid_json) { created_json.merge("data": {"channel_connections": 1}) }
      before(:each) do
        post "/webhook/v1/sora/connection.json",
          headers: { "Content-Type" => "application/json" },
          params: invalid_json.to_json
      end

      it "returns block resource" do
        expect(response.status).to eq 204
      end
    end
  end

  describe "POST /webhook/v1/sora/connection.json" do
    context "when is invalid channel_id" do
      let(:invalid_json) { created_json.merge("channel_id": "invalid_channel_id") }
      before(:each) do
        post "/webhook/v1/sora/connection.json",
             headers: { "Content-Type" => "application/json" },
             params: invalid_json.to_json
      end

      it "returns block resource" do
        expect(response.status).to eq 204
      end
    end

    context "when is archive empty" do
      let(:invalid_json) { created_json.merge("data": {"archives": []}) }
      before(:each) do
        post "/webhook/v1/sora/connection.json",
             headers: { "Content-Type" => "application/json" },
             params: invalid_json.to_json
      end

      it "returns block resource" do
        expect(response.status).to eq 204
      end
    end
  end
end
