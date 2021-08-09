require "rails_helper"

RSpec.describe Api::V1::BlocksController, type: :request do

  Conversation.destroy_all
  ReservableConversation.destroy_all
  CancelledConversation.destroy_all
  ConversationRequest.destroy_all
  User.destroy_all

  let(:user) { create :teacher }
  let(:stranger) { create :student }

  describe "GET /api/v1/blocks.json" do
    context "when blocks exists" do
      before(:each) do
        13.times do
          create :block, from_user: user, to_user: create(:student)
        end

        get "/api/v1/blocks.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }
      end

      it "returns some blocks", autodoc: true do
        expect(json["data"].count).to eq 10

        expect(json["meta"]["current_page"]).to eq 1
        expect(json["meta"]["per_page"]).to eq 10
        expect(json["meta"]["previous_page"]).to eq nil
        expect(json["meta"]["next_page"]).to eq 2
        expect(json["meta"]["total_pages"]).to eq 2
        expect(json["meta"]["total_entries"]).to eq 13
      end

      it "returns 2nd page blocks" do
        get "/api/v1/blocks.json", headers: {
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

      it "return only one blocks" do
        get "/api/v1/blocks.json", headers: {
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

  describe "POST /api/v1/blocks.json" do
    context "when is created successfully" do
      before(:each) do
        post "/api/v1/blocks.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          user_id: stranger.id,
        }
      end

      it "returns block resource", autodoc: true do
        expect(response.status).to eq 201
      end
    end
  end

  describe "DELETE /api/v1/blocks.json" do
    context "when is deleted successfully" do
      before(:each) do
        create :block, from_user: user, to_user: stranger

        delete "/api/v1/blocks.json", headers: {
          "Authorization" => "Bearer #{user.auth_token}",
        }, params: {
          user_id: stranger.id,
        }
      end

      it "returns block resource", autodoc: true do
        expect(response.status).to eq 200
      end
    end
  end
end
