require "rails_helper"

RSpec.describe Api::V1::FavoritesController, type: :request do

  let(:user) { create :teacher, organization_device_id: nil }
  let(:stranger) { create :student, organization_device_id: nil }

  describe "GET /api/v1/favorites.json" do
    context "when any favorite exists" do
      before(:each) do
        13.times do
          create :favorite, from_user: user, to_user: create(:student)
        end

        get "/api/v1/favorites.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "requests existing favorite users, and returns some of the users", autodoc: true do
        expect(json["data"].count).to eq 10

        expect(json["meta"]["current_page"]).to eq 1
        expect(json["meta"]["per_page"]).to eq 10
        expect(json["meta"]["previous_page"]).to eq nil
        expect(json["meta"]["next_page"]).to eq 2
        expect(json["meta"]["total_pages"]).to eq 2
        expect(json["meta"]["total_entries"]).to eq 13
      end

      it "requests existing favorite users, and returns some of the users on the 2nd page" do
        get "/api/v1/favorites.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          page: 2,
        }

        expect(json["data"].count).to eq 3

        expect(json["meta"]["current_page"]).to eq 2
        expect(json["meta"]["per_page"]).to eq 10
        expect(json["meta"]["previous_page"]).to eq 1
        expect(json["meta"]["next_page"]).to eq nil
        expect(json["meta"]["total_pages"]).to eq 2
        expect(json["meta"]["total_entries"]).to eq 13
      end

      it "requests only one of favorite users, and returns it" do
        get "/api/v1/favorites.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          per_page: 1,
        }

        expect(json["data"].count).to eq 1

        expect(json["meta"]["current_page"]).to eq 1
        expect(json["meta"]["per_page"]).to eq 1
        expect(json["meta"]["previous_page"]).to eq nil
        expect(json["meta"]["next_page"]).to eq 2
        expect(json["meta"]["total_pages"]).to eq 13
        expect(json["meta"]["total_entries"]).to eq 13
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "POST /api/v1/favorites.json" do
    context "when is created successfully" do
      before(:each) do
        post "/api/v1/favorites.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          user_id: stranger.id,
        }
      end

      it "registers the given user as the current user's favorite, and returns the user object", autodoc: true do
        expect(response.status).to eq 201
      end
    end
  end

  describe "DELETE /api/v1/favorites.json" do
    context "when is deleted successfully" do
      before(:each) do
        create :favorite, from_user: user, to_user: stranger

        delete "/api/v1/favorites.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          user_id: stranger.id,
        }
      end

      it "unregisted the given user from the current user's favorite list, and returns the user object", autodoc: true do
        expect(response.status).to eq 200
      end
    end
  end
end
