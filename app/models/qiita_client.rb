class QiitaClient
  require 'net/http'
  require 'uri'
  require 'json'

  API_URI = URI.parse('http://qiita.com/api/v2/users')
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
        stocks_per_page = get_json(http, "stocks?page=#{page_num}&per_page=100")
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
      @followees = get_json(http, "followees")
      @following_tags = get_json(http, "following_tags")
    end
    return { followees: @followees, following_tags: @following_tags }
  end

  private
    def get_json(http, last_uri)
      JSON.parse(http.get("#{API_URI.request_uri}/#{@user_id}/#{last_uri}", header = {'Authorization' => "Bearer #{@token}"}, dest = nil).body)
    end
end