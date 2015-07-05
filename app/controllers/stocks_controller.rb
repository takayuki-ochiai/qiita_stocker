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
    json = JSON.parse(response)
    #result = response.body

    #テストなのでJSONの最初のデータからいろいろとってみる
    #タイトルとタグとurlとuser_id

    url = json[0]["url"]
    tag = json[0]["tags"][0]
    user_id = json[0]["user"]["id"]
    #render
    render text: "#{url} + #{tag} + #{user_id}"
    #binding.pry
  end
end
