class HomeController < ApplicationController
  require 'pry'
  require 'net/http'
  require 'uri'
  require 'json'
  def index
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
  end
end
