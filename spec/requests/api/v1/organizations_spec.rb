require "rails_helper"

RSpec.describe Api::V1::OrganizationsController, type: :request do
  let(:device) { create :organization_device }
  let(:staff) { create :organization_staff, organization_device: device }
  before do
    4.times do
      create :teacher_with_picture, organization_device: device
    end
  end

  describe "GET /api/v1/organizations/users.json" do
    context "when user exists" do
      before(:each) do
        get "/api/v1/organizations/users.json", headers: {
          "Authorization" => "Bearer #{staff.auth_token}",
        }
      end

      it "returns some users", autodoc: true do
        expect(json.count).to eq 4

        expect(json[0]["id"]).to_not be_nil
        expect(json[0]["name"]).to_not be_nil
        expect(json[0]["picture_url"]).to_not be_nil
        expect(json[0]["auth_token"]).to_not be_nil
      end

      it { expect(response.status).to eq 200 }
    end
  end
end
