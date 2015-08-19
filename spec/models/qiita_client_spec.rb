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
end