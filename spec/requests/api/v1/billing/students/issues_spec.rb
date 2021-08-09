require "rails_helper"

RSpec.describe Api::V1::Billing::Students::IssuesController, type: :request do
  let(:user) { create :student }

  describe "GET /api/v1/billing/students/issues/available.json" do
    context "when credentials are correct" do
      before(:each) do
        get "/api/v1/billing/students/issues/available.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "returns user's billing status", autodoc: true do
        expect(json["issues"]).to_not be_nil
        expect(json["gracing"]).to_not be_nil
      end
    end
  end
end
