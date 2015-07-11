class StocksController < ApplicationController
  require 'pry'
  require 'net/http'
  require 'uri'
  require 'json'
  #Net::HTTP.version_1_2
  #http://qiita.com/api/v2/users/takayuki-ochiai/stocks
  # http://qiita.com/api/v2/users/takayuki-ochiai/stocks

  def index
    uri = URI.parse('http://qiita.com/api/v2/users/takayuki-ochiai/stocks')
    response = Net::HTTP.get(uri)
    @stocks = JSON.parse(response)

    #userのjson,tagのjsonも返さなければならない

    render json: @stocks

    #冷静に考えるとjson返せばあとはReactがどうにかしてくれるんだった。
  end
end
