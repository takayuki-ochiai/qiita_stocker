class SessionsController < ApplicationController
  require 'net/http'
  require 'uri'
  require 'json'
  require 'pry'

  def new
    uri = URI.parse('http://qiita.com/api/v2/access_tokens')
    Net::HTTP.version_1_2
    http = Net::HTTP.new(uri.host, uri.port)
    req = Net::HTTP::Post.new(uri.request_uri)
    req["Content-Type"] = "application/json"
    payload = {
      'client_id' => "e267c8bb3c5d5ed131adc0510fc12f0d29abe0c4",
      'client_secret' => "a3ac51f199dc83f0631e12b3c33f9645866d638f",
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
  end
end
