class HomeController < ApplicationController
  require 'pry'
  require 'net/http'
  require 'uri'
  require 'json'
  def index
    # uri = URI.parse('http://qiita.com/api/v2')
    Net::HTTP.version_1_2
    # Net::HTTP.start(uri.host, uri.port) do |http|
    #   @test = http.post("#{uri.request_uri}/access_tokens",
    #       "client_id=e267c8bb3c5d5ed131adc0510fc12f0d29abe0c4&client_secret=a3ac51f199dc83f0631e12b3c33f9645866d638f&code=#{params[:code]}"
    #   )
    #end
    res = Net::HTTP.post_form(
      URI.parse('http://qiita.com/api/v2/access_tokens'),
      { 'client_id' => "e267c8bb3c5d5ed131adc0510fc12f0d29abe0c4", 'client_secret' => "a3ac51f199dc83f0631e12b3c33f9645866d638f",'code' => params[:code]})
    binding.pry
  end
end
