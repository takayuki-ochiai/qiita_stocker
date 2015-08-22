class SessionsController < ApplicationController
  require 'net/http'
  require 'uri'
  require 'json'
  require 'pry'

  def new
    client_id = QiitaClient.client_id
    redirect_to "https://qiita.com/api/v2/oauth/authorize?client_id=#{client_id}&scope=read_qiita"
  end

  def delete
    reset_session
    redirect_to "/#/signin"
  end

  def create
    uri = URI.parse('http://qiita.com/api/v2/access_tokens')
    Net::HTTP.version_1_2
    http = Net::HTTP.new(uri.host, uri.port)
    req = Net::HTTP::Post.new(uri.request_uri)
    req["Content-Type"] = "application/json"
    payload = {
      'client_id' => QiitaClient.client_id,
      'client_secret' => QiitaClient.client_secret,
      'code' => params[:code]
    }.to_json

    req.body = payload
    res = http.request(req)

    token = JSON.parse(res.body)["token"]

    uri = URI.parse('http://qiita.com/api/v2')
    Net::HTTP.version_1_2
    Net::HTTP.start(uri.host, uri.port) do |http|
      user = JSON.parse(http.get("#{uri.request_uri}/authenticated_user", header = {'Authorization' => "Bearer #{token}"}, dest = nil).body)
      session[:user_id] = user["id"]
      session[:token] = token
    end
    redirect_to root_path
  end
end
