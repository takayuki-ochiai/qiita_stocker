require 'rails_helper'

describe QiitaClient do
  before do
    @client = QiitaClient.new("takayuki-ochiai", "9cd5f03035b0446c6f7f8f261b91faf9400f31b5")
  end

  describe "#all_stocks" do
    it "すべてのストックを取得する" do
      expect(@client.all_stocks.count).to be >= 168
    end
  end

  describe "#filter_data" do
    it "すべてのフィルターオプション用データを取得する" do
      filter_data = @client.filter_data
      expect(filter_data[:followees].last["permanent_id"]).to eq 7465
    end
  end
end