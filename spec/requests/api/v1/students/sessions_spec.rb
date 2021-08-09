require "rails_helper"

RSpec.describe Api::V1::Students::SessionsController, type: :request do
  let(:user) { create :student }

  describe "POST /api/v1/students/signin.json" do
    context "when credentials are correct" do
      before(:each) do
        post "/api/v1/students/signin.json", params: {
          email:    user.email,
          password: "password",
        }
      end

      it "signin user", autodoc: true do
        expect(json["id"]).to eq user.id
        expect(json["type"]).to eq user.type
        expect(json["name"]).to eq user.name
        expect(json["email"]).to eq user.email
        expect(json["auth_token"]).to_not be_nil
        expect(json["web_socket_token"]).to_not be_nil
        expect(json["sex"]).to eq user.sex
        expect(json["timezone"]).to eq user.timezone
        expect(json["birthday"]).to eq user.birthday.to_s
        expect(json["evaluate"]).to eq JSON.parse(user.evaluate.to_json)

        expect(json.has_key?("conversations")).to be true

        expect(json.has_key?("provider")).to be false
        expect(json.has_key?("encrypted_uid")).to be false
        expect(json.has_key?("encrypted_email")).to be false
        expect(json.has_key?("encrypted_birthday")).to be false
        expect(json.has_key?("password")).to be false
        expect(json.has_key?("password_confirmation")).to be false
        expect(json.has_key?("password_digest")).to be false
        expect(json.has_key?("is_activated")).to be false
        expect(json.has_key?("activated_at")).to be false
        expect(json.has_key?("activated_digest")).to be false
        expect(json.has_key?("activated_sent_at")).to be false
        expect(json.has_key?("reset_password_digest")).to be false
        expect(json.has_key?("reset_password_sent_at")).to be false
        expect(json.has_key?("deleted_at")).to be false
        expect(json.has_key?("created_at")).to be false
        expect(json.has_key?("updated_at")).to be false
      end

      it "returns new user tohas_keyn" do
        user.reload
        expect(json["auth_token"]).to eql user.auth_token
        expect(json["web_socket_token"]).to eql user.web_socket_token
      end

      it { expect(response.status).to eq 200 }
    end

    context "when credentials are wrong" do
      it "because of email" do
        post "/api/v1/students/signin.json", params: {
          email: "wrong@email.com",
          password: "password",
        }

        expect(json["error"]["message"][0]).to eq I18n.t("errors.authentication")
        expect(json["error"]["status"]).to eq 422
        expect(response.status).to eq 422
      end

      it "because of password" do
        post "/api/v1/students/signin.json", params: {
          email: user.email,
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
          email:     user.email,
          password:  "password",
          fcm_token: "ABCDEFG",
        }
      end
      before(:each) do
        post "/api/v1/students/signin.json", params: signin_params
      end

      it "renders resource created" do
        user = User.find(json["id"])
        expect(signin_params[:fcm_token]).to eq user.fcm_token
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "DELETE /api/v1/students/signout.json" do
    context "when logout correctly" do
      before(:each) {
        post "/api/v1/students/signin.json", params: {
          email: user.email,
          password: "password",
        }

        user.reload # regenerated user.auth_token
        delete "/api/v1/students/signout.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      }

      it "success", autodoc: true do
        expect(response.status).to eq 204
      end

      it "cannot be found anymore" do
        expect { User.find_by!(auth_token: user.auth_token) }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context "when doesn\"t exists" do
      before(:each) do
        post "/api/v1/students/signin.json", params: {
          email: user.email,
          password: "password",
        }

        delete "/api/v1/students/signout.json", headers: {
          "Authorization" => "Bearer unused_token",
        }
      end

      it { expect(response.status).to eq 401 }
    end

    context "when invalid auth-scheme" do
      before(:each) do
        post "/api/v1/students/signin.json", params: {
          email: user.email,
          password: "password",
        }

        delete "/api/v1/students/signout.json", headers: {
          "Authorization" => "Tohas_keyn #{user.auth_token}",
        }
      end

      it { expect(response.status).to eq 401 }
    end
  end
end
