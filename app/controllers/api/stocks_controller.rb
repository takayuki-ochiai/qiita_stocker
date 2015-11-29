module Api
  class StocksController < ApplicationController
    require 'pry'
    require 'net/http'
    require 'uri'
    require 'json'

    def index
      client = QiitaClient.new(session[:user_id], session[:token])
      stocks = client.all_stocks

      stock_query = StockQuery.new(stocks, params[:keyword], params[:following_tags], params[:followees])
      @stocks = stock_query.select_stocks
      #stockの持つタグを集計する
      #TODO: なんかやぼったい書き方しているのどうにかしたい
      @stock_tags = @stocks.reduce([]) do |result, stock|
          result.push(stock["tags"])
        end
        .flatten
        .map{ |tag| {name: tag["name"]} }
        .uniq

      render json: { stocks: @stocks , stock_tags: @stock_tags, stock_num: @stocks.count }
    end

    def filter_data
      client = QiitaClient.new(session[:user_id], session[:token])
      filter_data = client.filter_data
      @followees = filter_data[:followees]
      @following_tags = filter_data[:following_tags]

      render json: { followees: @followees, followingTags: @following_tags }
    end
  end
end
