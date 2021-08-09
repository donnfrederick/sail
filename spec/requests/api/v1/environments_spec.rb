require "rails_helper"

RSpec.describe Api::V1::EnvironmentsController, type: :request do
  describe "GET /api/v1/environments.json" do
    context "when environments exists" do
      before(:each) do
        get "/api/v1/environments.json"
      end

      it "returns environments", autodoc: true do

        expect(json["sora_signaling_url"]).to_not be_nil
        expect(json["sora_api_url"]).to_not be_nil
        expect(json["app_socket_url"]).to_not be_nil
      end

      it { expect(response.status).to eq 200 }
    end
  end
end
