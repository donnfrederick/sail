require "rails_helper"

RSpec.describe Api::V1::LocationsController, type: :request do
  describe "GET /api/v1/locations/countries.json" do
    context "when countries exists" do
      before(:each) do
        get "/api/v1/locations/countries.json"
      end

      it "returns all countries", autodoc: true do
        expect(json["data"][0][0]).to eq "Afghanistan"
        expect(json["data"][0][1]).to eq "AF"

        expect(json["meta"]["default_country"]).to eq "US"
        expect(json["meta"]["default_timezone"]).to eq "America/New_York"
      end

      it { expect(response.status).to eq 200 }
    end

    context "when 'CloudFront-Viewer-Country' header exists" do
      before(:each) do
        get "/api/v1/locations/countries.json", headers: {
          "CloudFront-Viewer-Country" => "VN",
        }
      end

      it "returns all countries" do
        expect(json["data"][0][0]).to eq "Afghanistan"
        expect(json["data"][0][1]).to eq "AF"

        expect(json["meta"]["default_country"]).to eq "VN"
        expect(json["meta"]["default_timezone"]).to eq "Asia/Ho_Chi_Minh"
      end

      it { expect(response.status).to eq 200 }
    end
  end

  describe "GET /api/v1/locations/timezones.json" do
    context "when timezones exists" do
      before(:each) do
        get "/api/v1/locations/timezones.json", params: {
          country: "us",
        }
      end

      it "returns some timezones", autodoc: true do
        expect(json["data"].count).to eq 29
        expect(json["data"][0]).to eq "America/New_York"

        expect(json["meta"]["default_country"]).to eq "US"
        expect(json["meta"]["default_timezone"]).to eq "America/New_York"
      end

      it { expect(response.status).to eq 200 }
    end

    context "when 'CloudFront-Viewer-Country' header exists" do
      before(:each) do
        get "/api/v1/locations/timezones.json", params: {
          country: "us",
        }, headers: {
          "CloudFront-Viewer-Country" => "VN",
        }
      end

      it "returns some timezones" do
        expect(json["data"].count).to eq 29
        expect(json["data"][0]).to eq "America/New_York"

        expect(json["meta"]["default_country"]).to eq "VN"
        expect(json["meta"]["default_timezone"]).to eq "Asia/Ho_Chi_Minh"
      end

      it { expect(response.status).to eq 200 }
    end
  end
end
