class QiitaClient
  require 'net/http'
  require 'uri'
  require 'json'

  API_URI = URI.parse('http://qiita.com/api/v2')
  Net::HTTP.version_1_2

  def initialize(user_id, token)
    @user_id = user_id
    @token = token
  end

  def all_stocks
    #qiitaのapiを叩く
    #すべてのデータを取ってくる
    @stocks = []
    Net::HTTP.start(API_URI.host, API_URI.port) do |http|
      page_num = 1
      while true do
        stocks_per_page = JSON.parse(http.get("#{API_URI.request_uri}/users/#{@user_id}/stocks?page=#{page_num}&per_page=100", header = {'Authorization' => "Bearer #{@token}"}, dest = nil).body)
        @stocks.concat(stocks_per_page)
        page_num += 1
        break if stocks_per_page.count < 100
      end
    end
    @stocks
  end

  def filter_data
    #qiitaのapiを叩いてフォロー中のタグとユーザーをとってくる
    Net::HTTP.version_1_2
    Net::HTTP.start(API_URI.host, API_URI.port) do |http|
      @followees = JSON.parse(http.get("#{API_URI.request_uri}/users/#{@user_id}/followees", header = {'Authorization' => "Bearer #{@token}"}, dest = nil).body)

      @following_tags = JSON.parse(http.get("#{API_URI.request_uri}/users/#{@user_id}/following_tags", header = {'Authorization' => "Bearer #{@token}"}, dest = nil).body)
    end
    return { followees: @followees, following_tags: @following_tags }
  end
end