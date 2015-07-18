class StocksController < ApplicationController
  require 'pry'
  require 'net/http'
  require 'uri'
  require 'json'

  def index
    #qiitaのapiを叩く
    uri = URI.parse('http://qiita.com/api/v2/')
    Net::HTTP.version_1_2
    Net::HTTP.start(uri.host, uri.port) do |http|
      @stocks = JSON.parse(http.get("#{uri.request_uri}users/takayuki-ochiai/stocks?page=1&per_page=100", header = {'Authorization' => 'Bearer 9cd5f03035b0446c6f7f8f261b91faf9400f31b5'}, dest = nil).body)

      @followees = JSON.parse(http.get("#{uri.request_uri}users/takayuki-ochiai/followees", header = {'Authorization' => 'Bearer 9cd5f03035b0446c6f7f8f261b91faf9400f31b5'}, dest = nil).body)

      @following_tags = JSON.parse(http.get("#{uri.request_uri}users/takayuki-ochiai/following_tags", header = {'Authorization' => 'Bearer 9cd5f03035b0446c6f7f8f261b91faf9400f31b5'}, dest = nil).body)
    end

    #stockの持つタグを集計する
    #TODO: なんかやぼったい書き方しているのどうにかしたい
    @stock_tags = @stocks.reduce([]) { |result, stock|
      result.push(stock["tags"])
    }.flatten
    .map{ |tag| {name: tag["name"]} }
    .uniq
    #9cd5f03035b0446c6f7f8f261b91faf9400f31b5
    render json: { stocks: @stocks , stock_tags: @stock_tags, followees: @followees, following_tags: @following_tags }
  end
end
