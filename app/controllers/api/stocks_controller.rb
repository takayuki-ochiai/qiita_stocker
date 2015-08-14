module Api
  class StocksController < ApplicationController
    require 'pry'
    require 'net/http'
    require 'uri'
    require 'json'

    def index
      client = QiitaClient.new(session[:user_id], session[:token])
      @stocks = client.all_stocks

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

      render json: { stocks: @stocks , stock_tags: @stock_tags, stock_num: @stocks.count }
    end

    def filter_data
      client = QiitaClient.new(session[:user_id], session[:token])
      filter_data = client.filter_data
      @followees = filter_data[:followees]
      @following_tags = filter_data[:following_tags]

      render json: { followees: @followees, following_tags: @following_tags }
    end
  end
end