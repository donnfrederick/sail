require "rails_helper"

RSpec.describe Webhook::V1::StripeController, type: :request do

  describe "POST /webhook/v1/stripe/event.json" do
    context "when is created successfully" do
      before(:each) do
        post "/webhook/v1/stripe/event.json",
          headers: { "Content-Type" => "application/json" },
          params: {
            type: "stripe.webhook_name",
            data: []
          }.to_json
      end

      it "returns ok", autodoc: true do
        expect(response.status).to eq 200
      end
    end
  end
end
