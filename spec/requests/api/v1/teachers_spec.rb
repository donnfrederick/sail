require "rails_helper"

RSpec.describe Api::V1::TeachersController, type: :request do
  let(:hobbies)  { create_hobbies }
  let(:purposes) { create_purposes }

  let(:user) {
    create(
      :teacher,
      hobbies: hobbies.first(3),
      purposes: purposes.first(3),
    )
  }
  let(:stranger) {
    create(
      :teacher,
      hobbies: hobbies.first(3),
      purposes: purposes.first(3),
    )
  }

  # for JSON params
  let(:user_attr) do
    {
      email:                 "test-user@example.com",
      password:              "password",
      # password_confirmation: "password",
      name:                  Gimei.hiragana,
      sex:                   User::SEX_MALE,
      picture:               "data:image/jpeg;base64," + Base64.strict_encode64(Rails.root.join("spec/factories/files/10x10.png").read),
      hobbies:               hobbies.map(&:id).first(3),
      purposes:              purposes.map(&:id).first(3),
      desired_condition:     1,
    }
  end

  # for multipart/form-data params
  let(:user_attr_form) do
    user_attr.merge(
      picture: fixture_file_upload(Rails.root.join("spec/factories/files/10x10.png"), "image/png"),
    )
  end

  describe "POST /api/v1/teachers.json" do
    context "when is created successfully with json params" do
      before(:each) do
        post "/api/v1/teachers.json", params: user_attr.to_json,
                                      headers: { "Content-Type" => "application/json" }
      end

      it "renders resource created (`rated_conversation_level`が`nil`のときは未評価を意味します)", autodoc: true do
        expect(json["type"]).to eq Teacher.name
        expect(json["name"]).to eq user_attr[:name]
        expect(json["email"]).to eq user_attr[:email]
        expect(json["sex"]).to eq user_attr[:sex]
        expect(json["country"]).to  eq "日本"
        expect(json["timezone"]).to eq Teacher::DEFAULT_TIMEZONE

        expect(json["hobbies"].count).to eq user_attr[:hobbies].count
        expect(json["purposes"].count).to eq user_attr[:purposes].count

        expect(json["id"]).to_not be_nil
        expect(json["auth_token"]).to_not be_nil
        expect(json["web_socket_token"]).to_not be_nil
        expect(json["picture_url"]).to_not be_nil

        expect(json.has_key?("birthday")).to be true
        expect(json.has_key?("evaluate")).to be true
        expect(json.has_key?("lateness")).to be true
        expect(json.has_key?("location")).to be true




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

      it { expect(response.status).to eq 201 }
    end

    context "when is created successfully with multipart/form-data params" do
      before(:each) do
        post "/api/v1/teachers.json", params: user_attr_form
      end

      it "renders resource created" do
        expect(json["id"]).to_not be_nil
        expect(json["auth_token"]).to_not be_nil
        expect(json["web_socket_token"]).to_not be_nil
        expect(json["picture_url"]).to_not be_nil
      end

      it { expect(response.status).to eq 201 }
    end

    context "when is created successfully without sex param" do
      let(:user_attr_without_sex) { user_attr.reject {|k, v| k == :sex } }
      before(:each) do
        post "/api/v1/teachers.json", params: user_attr_without_sex.to_json,
                                      headers: { "Content-Type" => "application/json" }
      end

      it "renders resource created" do
        expect(json["id"]).to_not be_nil
        expect(json["auth_token"]).to_not be_nil
        expect(json["web_socket_token"]).to_not be_nil
        expect(json["picture_url"]).to_not be_nil
        expect(json["sex"]).to eq 0
      end

      it { expect(response.status).to eq 201 }
    end

    context "when is created successfully with fcm_token" do
      let(:user_attr_with_fcm) { user_attr.merge(fcm_token: "ABCDEFG") }
      before(:each) do
        post "/api/v1/teachers.json", params: user_attr_with_fcm.to_json,
                                      headers: { "Content-Type" => "application/json" }
      end

      it "renders resource created" do
        expect(json["id"]).to_not be_nil
        expect(json["auth_token"]).to_not be_nil
        expect(json["web_socket_token"]).to_not be_nil
        expect(json["picture_url"]).to_not be_nil

        user = User.find(json["id"])
        expect(user_attr_with_fcm[:fcm_token]).to eq user.fcm_token
      end

      it { expect(response.status).to eq 201 }
    end
  end

  describe "GET /api/v1/teachers/me.json" do
    context "when user exists" do
      before(:each) do
        get "/api/v1/teachers/me.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "returns the resosurce", autodoc: true do
        expect(json["id"]).to eq user.id
        expect(json["auth_token"]).to eq user.auth_token
        expect(json["web_socket_token"]).to eq user.web_socket_token
        expect(json["type"]).to eq user.type
        expect(json["name"]).to eq user.name
        expect(json["email"]).to eq user.email
        expect(json["sex"]).to eq user.sex
        expect(json["country"]).to  eq "日本"
        expect(json["timezone"]).to eq user.timezone
        expect(json["picture_url"]).to eq user.picture_url
        expect(json["birthday"]).to eq user.birthday.to_s
        expect(json["evaluate"]).to eq JSON.parse(user.evaluate.to_json)
        expect(json["lateness"]).to eq user.lateness
        expect(json["location"]).to eq user.location

        expect(json["hobbies"].count).to eq user.hobbies.count
        expect(json["purposes"].count).to eq user.purposes.count




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

      it { expect(response.status).to eq 200 }
    end
  end

  describe "GET /api/v1/teachers/:id.json" do
    context "when user exists" do
      before(:each) do
        get "/api/v1/teachers/#{stranger.id}.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "returns the resosurce", autodoc: true do
        expect(json["id"]).to eq stranger.id
        expect(json["type"]).to eq stranger.type
        expect(json["name"]).to eq stranger.name
        expect(json["sex"]).to eq stranger.sex
        expect(json["country"]).to  eq "日本"
        expect(json["timezone"]).to eq stranger.timezone
        expect(json["picture_url"]).to eq stranger.picture_url
        expect(json["evaluate"]).to_not be_nil
        expect(json["lateness"]).to eq stranger.lateness
        expect(json["location"]).to eq stranger.location
        expect(json["is_blocked"]).to be_in([true, false])
        expect(json["is_favorite"]).to be_in([true, false])

        expect(json["hobbies"].count).to eq stranger.hobbies.count
        expect(json["purposes"].count).to eq stranger.purposes.count



        expect(json.has_key?("conversations")).to be true

        expect(json.has_key?("auth_token")).to be false
        expect(json.has_key?("web_socket_token")).to be false
        expect(json.has_key?("email")).to be false
        expect(json.has_key?("birthday")).to be false
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
        expect(json.has_key?("organization_device")).to be false
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "GET /api/v1/teachers/:id/evaluations.json" do
    context "when user exists" do
      before(:each) do
        get "/api/v1/teachers/#{stranger.id}/evaluations.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "アクセスユーザーとこのシニアユーザーが行った会話のみの、未評価会話データ、メモデータ、報告データを取得します。なお、ブロック中の場合は履歴に表示されません。`memos`は`[{timestamp: string, memo: string},...]`として、、`reports`は`[{timestamp: string, report: string},...]`として、`unrated_conversation`は`[{timestamp: string, id: integer},...]`として返します。このとき、`unrated_conversation`の`id`は`conversation.id`を指します。", autodoc: true do
        expect(json["memos"]).to_not be_nil
        expect(json["reports"]).to_not be_nil
        expect(json["unrated_conversations"]).to_not be_nil
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "PATCH /api/v1/teachers/me.json" do
    context "when is users.name updated" do
      let(:update_attr) { { name: Gimei.hiragana } }
      before(:each) do
        patch "/api/v1/teachers/me.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: update_attr
      end

      it "renders resource updated", autodoc: true do
        expect(json["id"]).to eq user.id
        expect(json["name"]).to eq update_attr[:name]
      end

      it { expect(response.status).to eq 200 }
    end

    context "when is users.name are wrong" do
      let(:update_attr) { { name: Gimei.kanji } }
      before(:each) do
        patch "/api/v1/teachers/me.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: update_attr
      end

      it "renders resource updated", autodoc: true do
        expect(json["error"]["message"][0]).to eq "名前は「ひらがな」で入力してください"
      end

      it { expect(response.status).to eq 422 }
    end

    context "when is users.picture multipart/form-data updated" do
      let(:update_attr) do
        {
          picture: fixture_file_upload(
            Rails.root.join("spec/factories/files/10x10.png"),
            "image/png",
          ),
        }
      end
      before(:each) do
        patch "/api/v1/teachers/me.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: update_attr
      end

      it "renders resource updated" do
        expect(json["id"]).to_not be_nil
        expect(json["picture_url"]).to_not be_nil
      end

      it { expect(response.status).to eq 200 }
    end

    context "when is users.picture base64 updated" do
      it "renders resource updated" do
        update_attr = {
          picture: user_attr[:picture],
        }
        patch "/api/v1/teachers/me.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: update_attr

        expect(json["id"]).to_not be_nil
        expect(json["picture_url"]).to_not be_nil

        expect(response.status).to eq 200
      end

      it "raw data only updated" do
        update_attr = {
          picture: user_attr[:picture].gsub(/data:(.*?);(.*?),/, ""),
        }
        patch "/api/v1/teachers/me.json", params: update_attr,
                                          headers: {
                                            "Authorization" => "Bearer #{user.auth_token}",
                                          }

        expect(json["id"]).to_not be_nil
        expect(json["picture_url"]).to_not be_nil

        expect(response.status).to eq 200
      end
    end

    context "when is users.password updated" do
      let(:new_password) { "newpassword" }
      let(:update_attr) {
        {
          current_password: user_attr[:password],
          password:         new_password,
        }
      }
      before(:each) do
        patch "/api/v1/teachers/me.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: update_attr

        post "/api/v1/teachers/signin.json", params: {
          email:    user.email,
          password: new_password,
        }
      end

      it "renders resource updated" do
        expect(json["id"]).to eq user.id
        expect(json["updated_at"]).to eq update_attr[:name]
      end

      it { expect(response.status).to eq 200 }
    end

    context "when is current_password are wrong" do
      let(:new_password) { "newpassword" }
      let(:update_attr) {
        {
          current_password: "dummy_password",
          password:         new_password,
        }
      }
      before(:each) do
        patch "/api/v1/teachers/me.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: update_attr

        post "/api/v1/teachers/signin.json", params: {
          email:    user.email,
          password: new_password,
        }
      end

      it { expect(response.status).to eq 422 }
    end

    context "when is users.hobbies updated" do
      let(:select_hobby_ids) { hobbies.map(&:id)[2..4] }
      let(:update_attr) { { hobbies: select_hobby_ids } }
      before(:each) do
        patch "/api/v1/teachers/me.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: update_attr
      end

      it "renders resource updated" do
        expect(json["id"]).to eq user.id

        expect(json["hobbies"].count).to eq 3
        expect(json["hobbies"].map {|x| x["id"] }.sort).to eq select_hobby_ids
      end

      it { expect(response.status).to eq 200 }
    end

    context "when is users.purposes updated" do
      let(:select_purpose_ids) { purposes.map(&:id)[1..3] }
      let(:update_attr) { { purposes: select_purpose_ids } }
      before(:each) do
        patch "/api/v1/teachers/me.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: update_attr
      end

      it "renders resource updated" do
        expect(json["id"]).to eq user.id

        expect(json["purposes"].count).to eq 3
        expect(json["purposes"].map {|x| x["id"] }.sort).to eq select_purpose_ids
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "DELETE /api/v1/teachers/me.json" do
    context "when is deleted" do
      before(:each) do
        delete "/api/v1/teachers/me.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "cannot be found anymore" do
        expect { User.find(user.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it { expect(response.status).to eq 204 }
    end
  end

  describe "POST /api/v1/teachers/validate.json" do
    context "when is validate ok" do
      before(:each) do
        post "/api/v1/teachers/validate.json", params: user_attr
      end

      it "renders resource updated" do
        expect(response.status).to eq 200
      end
    end

    context "when is email are wrong" do
      let(:update_attr) { { password: "1" } }
      before(:each) do
        post "/api/v1/teachers/validate.json", params: update_attr
      end

      it "renders error messages", autodoc: true do
        expect(json.has_key?("error")).to be true
      end

      it { expect(response.status).to eq 422 }
    end
  end

  describe "GET /api/v1/teachers/hobbies.json" do
    context "when hobbies exists" do
      before do
        create_hobbies
      end
      before(:each) do
        get "/api/v1/teachers/hobbies.json"
      end

      it "returns selectable some hobbies", autodoc: true do
        expect(json.count).to eq 9

        expect(json[0].has_key?("id")).to be true
        expect(json[0].has_key?("name")).to be true

        expect(json[0].has_key?("name_ja")).to be false
        expect(json[0].has_key?("name_en")).to be false
        expect(json[0].has_key?("created_at")).to be false
        expect(json[0].has_key?("updated_at")).to be false
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "GET /api/v1/teachers/purposes.json" do
    context "when purposes exists" do
      before do
        create_purposes
      end
      before(:each) do
        get "/api/v1/teachers/purposes.json"
      end

      it "returns selectable some purposes", autodoc: true do
        expect(json.count).to eq 4

        expect(json[0].has_key?("id")).to be true
        expect(json[0].has_key?("name")).to be true

        expect(json[0].has_key?("name_ja")).to be false
        expect(json[0].has_key?("name_en")).to be false
        expect(json[0].has_key?("created_at")).to be false
        expect(json[0].has_key?("updated_at")).to be false
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "POST /api/v1/teachers/password.json" do
    context "when is email exists" do
      before(:each) do
        post "/api/v1/teachers/password.json", params: {
          email: user.email,
        }
      end

      it "renders resource updated", autodoc: true do
        expect(response.status).to eq 200
      end
    end

    context "when is email are wrong" do
      before(:each) do
        post "/api/v1/teachers/password.json", params: {
          email: "invalid-email@example.com"
        }
      end

      it { expect(response.status).to eq 404 }
    end
  end

  describe "PATCH /api/v1/teachers/password.json" do
    context "when is token exists" do
      before(:each) do
        post "/api/v1/teachers/password.json", params: {
          email: user.email,
        }
        user.reload
        patch "/api/v1/teachers/password.json", params: {
          token:    user.password_reset_digest,
          password: "new_password",
        }
      end

      it "renders resource updated", autodoc: true do
        expect(response.status).to eq 200
      end
    end

    context "when is token are wrong" do
      before(:each) do
        post "/api/v1/teachers/password.json", params: {
          email: user.email,
        }
        patch "/api/v1/teachers/password.json", params: {
          token:    "invalid_token",
          password: "new_password",
        }
      end

      it { expect(response.status).to eq 404 }
    end
  end
end
