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
      @followees = get_json(http, "followees?page=1&per_page=100")
      @following_tags = get_json(http, "following_tags?page=1&per_page=100")
    end

    @followees.each_with_index { |followee, index| followee['index'] = index }
    @following_tags.each_with_index { |following_tag, index| following_tag['index'] = index }

    return { followees: @followees, following_tags: @following_tags }
  end

  def self.client_id
    return "e267c8bb3c5d5ed131adc0510fc12f0d29abe0c4" if Rails.env == 'development' || Rails.env == 'test'
      "d0df24581cc04d5ea465018dc873c88830939ef1"
  end

  def self.client_secret
    return "a3ac51f199dc83f0631e12b3c33f9645866d638f" if Rails.env == 'development' || Rails.env == 'test'
      "4f5190a3e74f5b95b2780a7e2c5a818a76ddcde3"
  end

  private
    def get_json(http, last_uri)
      JSON.parse(http.get("#{API_URI.request_uri}/#{@user_id}/#{last_uri}", header = {'Authorization' => "Bearer #{@token}"}, dest = nil).body)
    end
end
