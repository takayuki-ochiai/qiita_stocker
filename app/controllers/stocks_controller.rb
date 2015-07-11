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
      @stocks = JSON.parse(http.get("#{uri.request_uri}users/takayuki-ochiai/stocks").body)
      @followees = JSON.parse(http.get("#{uri.request_uri}users/takayuki-ochiai/followees").body)
      @following_tags = JSON.parse(http.get("#{uri.request_uri}users/takayuki-ochiai/following_tags").body)
    end

    #stockの持つタグを集計する
    stock_tags = @stocks.reduce([]) { |result, stock|
      result.push(stock["tags"])
    }

    stock_tags = stock_tags.flatten.map{|result| result["name"]}.uniq

    render json: { stocks: @stocks , stock_tags: stock_tags, followees: @followees, following_tags: @following_tags }
  end
end
