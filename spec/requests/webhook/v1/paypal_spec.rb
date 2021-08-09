require "rails_helper"

RSpec.describe Webhook::V1::PaypalController, type: :request do

  describe "POST /webhook/v1/paypal/event.json" do
    context "when is created successfully" do
      before(:each) do
        post "/webhook/v1/paypal/event.json",
          headers: { "Content-Type" => "application/json" },
          params: {
            event_type: "paypal.webhook_name",
            resource: {
              id: "123456789",
              name: "paypal.resource"
            }
          }.to_json
      end

      it "returns ok", autodoc: true do
        expect(response.status).to eq 200
      end
    end
  end
end
