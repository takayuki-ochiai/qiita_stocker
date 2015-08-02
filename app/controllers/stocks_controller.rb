class StocksController < ApplicationController
  require 'pry'
  require 'net/http'
  require 'uri'
  require 'json'

  def index
    #qiitaのapiを叩く
    uri = URI.parse('http://qiita.com/api/v2')
    Net::HTTP.version_1_2
    Net::HTTP.start(uri.host, uri.port) do |http|
      @stocks = JSON.parse(http.get("#{uri.request_uri}/users/takayuki-ochiai/stocks?page=1&per_page=100", header = {'Authorization' => 'Bearer 9cd5f03035b0446c6f7f8f261b91faf9400f31b5'}, dest = nil).body)
    end

    #投稿にタグ付けされたタグの一部分を含んでいる
    #投稿者の名前の一部分を含んでいる
    #全て大文字小文字を問わない
    if params[:keyword].present?
      @stocks.select! do |stock|
        keyword = Regexp.new(params[:keyword], Regexp::IGNORECASE)
        stock["body"] =~ keyword || stock["title"] =~ keyword || stock["user"]["id"] =~ keyword || stock["tags"].any?{ |tag| tag["name"] =~ keyword }
      end
    end

    #いずれかのfilterOptionが存在する時に入る。
    #検索条件はORで

    #タグとフォロイーの条件はAND条件である
    #オプションに何も入力されていない時は・・・考えていなかった
    #なにも付いていない場合は全部もらってくればいいじゃん？
    if params[:following_tags].present?
      following_tags_criteria = Array(
        params[:following_tags].try(:map) do |key, value|
          value["id"]
        end
      )

      @stocks.select! do |stock|
        (stock["tags"].map{ |tag| tag["name"] } & following_tags_criteria).count != 0
      end
    end

    if params[:followees].present?
      followees_criteria = Array(params[:followees].try(:map) {|key, value| value["id"]})

      @stocks.select! do |stock|
        followees_criteria.include?(stock["user"]["id"])
      end
    end

    #stockの持つタグを集計する
    #TODO: なんかやぼったい書き方しているのどうにかしたい
    @stock_tags = @stocks.reduce([]) do |result, stock|
        result.push(stock["tags"])
      end
      .flatten
      .map{ |tag| {name: tag["name"]} }
      .uniq

    render json: { stocks: @stocks , stock_tags: @stock_tags }
  end

  def filter_data
    #qiitaのapiを叩いてフォロー中のタグとユーザーをとってくる
    uri = URI.parse('http://qiita.com/api/v2')
    Net::HTTP.version_1_2
    Net::HTTP.start(uri.host, uri.port) do |http|
      @followees = JSON.parse(http.get("#{uri.request_uri}/users/takayuki-ochiai/followees", header = {'Authorization' => 'Bearer 9cd5f03035b0446c6f7f8f261b91faf9400f31b5'}, dest = nil).body)

      @following_tags = JSON.parse(http.get("#{uri.request_uri}/users/takayuki-ochiai/following_tags", header = {'Authorization' => 'Bearer 9cd5f03035b0446c6f7f8f261b91faf9400f31b5'}, dest = nil).body)
    end

    render json: { followees: @followees, following_tags: @following_tags }
  end

  #qiitaのapiを叩いて使用しているユーザーのデータをとってくる
  def user_data
    uri = URI.parse('http://qiita.com/api/v2')
    user_id = "takayuki-ochiai"

    Net::HTTP.version_1_2
    Net::HTTP.start(uri.host, uri.port) do |http|
      @current_user = JSON.parse(http.get("#{uri.request_uri}/users/#{user_id}", header = {'Authorization' => 'Bearer 9cd5f03035b0446c6f7f8f261b91faf9400f31b5'}, dest = nil).body)
    end

    render json: { user: @current_user }
  end
end
