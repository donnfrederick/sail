require "rails_helper"

RSpec.describe Api::V1::Organizations::SessionsController, type: :request do
  let(:device) { create :organization_device }
  let(:staff) { create :organization_staff, organization_device: device }

  describe "POST /api/v1/organizations/signin.json" do
    context "when credentials are correct" do
      before(:each) do
        post "/api/v1/organizations/signin.json", params: {
          email:    staff.email,
          password: "password",
        }
      end

      it "signin staff", autodoc: true do
        expect(json["id"]).to eq staff.id
        expect(json["auth_token"]).to_not be_nil
      end

      it "returns new staff tohas_keyn" do
        staff.reload
        expect(json["auth_token"]).to eql staff.auth_token
      end

      it { expect(response.status).to eq 200 }
    end

    context "when credentials are wrong" do
      it "because of email" do
        post "/api/v1/organizations/signin.json", params: {
          email: "wrong@email.com",
          password: "password",
        }

        expect(json["error"]["message"][0]).to eq I18n.t("errors.authentication")
        expect(json["error"]["status"]).to eq 422
        expect(response.status).to eq 422
      end

      it "because of password" do
        post "/api/v1/organizations/signin.json", params: {
          email:    staff.email,
          password: "invalid_password",
        }

        expect(json["error"]["message"][0]).to eq I18n.t("errors.authentication")
        expect(json["error"]["status"]).to eq 422
        expect(response.status).to eq 422
      end
    end
    
    context "when is successfully with fcm_token" do
      let(:signin_params) do
        {
          email:     staff.email,
          password:  "password",
          fcm_token: "ABCDEFG",
        }
      end
      before(:each) do
        post "/api/v1/organizations/signin.json", params: signin_params
      end

      it "renders resource created" do
        staff = OrganizationStaff.find(json["id"])
        expect(signin_params[:fcm_token]).to eq staff.fcm_token
      end

      it { expect(response.status).to eq 200 }
    end
  end
end
