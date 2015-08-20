require 'rails_helper'

describe StockQuery do
  describe "#select_stocks" do
    before do
      client = QiitaClient.new("takayuki-ochiai", "9cd5f03035b0446c6f7f8f261b91faf9400f31b5")
      @stocks = client.all_stocks
    end

    context "キーワードのみの場合" do
      before do
        @query = StockQuery.new(@stocks, "Ruby", nil, nil)
      end

      it "キーワードが含まれるタイトルのものが選択される" do
        titles = @query.select_stocks
          .map do |stock|
            stock["title"]
          end

        expect(titles).to include("Ruby でベンチマークを取る方法", "RubyでJSON形式の結果が返ってくるURLをParseする", "Rubyで使えるGoogle API一覧", "[初心者向け] RubyやRailsでリファクタリングに使えそうなイディオムとか便利メソッドとか", "[Ruby] ブロックとProcをちゃんと理解する")
      end

      it "本文にRubyが含まれるものが選ばれる(大文字小文字を問わない)" do
        ids = @query.select_stocks
          .map do |stock|
            stock["id"]
          end

        expect(ids).to include("ec8e928f69d099b25764", "42193d066bd61c740612", "3d23aa154b483ef611d3", "f2ae316dc8e98b4ff82a", "c5b2aeaf7d67a9ef310a", "bb60ee62c3ee770de2fc", "8121615d4634500a331c")
      end

      it "キーワードが含まれる投稿者名の投稿が選択される" do
        @query.keyword = "jnchito"
        ids = @query.select_stocks
          .map do |stock|
            stock["id"]
          end

        expect(ids).to include("459d58ba652bf4763820", "dedb3b889ab226933ccf", "a7d3005aaa9401480a47", "42193d066bd61c740612")
      end
    end
  end
end