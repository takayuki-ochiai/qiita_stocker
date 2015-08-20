class StockQuery
  attr_writer :keyword
  def initialize(stocks, keyword, following_tags, followees)
    @all_stocks = stocks
    @result_stocks = stocks
    @keyword = keyword
    @following_tags = following_tags
    @followees = followees
  end

  def select_stocks
    select_by_keyword
    select_by_following_tags
    select_by_followees
    #いずれかのfilterOptionが存在する時に入る。
    #検索条件はORで
    @result_stocks
  end

  def select_by_keyword
    #投稿にタグ付けされたタグの一部分を含んでいる
    #投稿者の名前の一部分を含んでいる
    #全て大文字小文字を問わない
    if @keyword.present?
      @result_stocks.select! do |stock|
        keyword = Regexp.new(@keyword, Regexp::IGNORECASE)
        stock["body"] =~ keyword || stock["title"] =~ keyword || stock["user"]["id"] =~ keyword || stock["tags"].any?{ |tag| tag["name"] =~ keyword }
      end
    end
  end

  def select_by_following_tags
    #タグとフォロイーの条件はAND条件である
    #オプションに何も入力されていない時は・・・考えていなかった
    #なにも付いていない場合は全部もらってくればいいじゃん？
    if @following_tags.present?
      following_tags_criteria = Array(
        @following_tags.try(:map) do |key, value|
          value["id"]
        end
      )

      @result_stocks.select! do |stock|
        (stock["tags"].map{ |tag| tag["name"] } & following_tags_criteria).count != 0
      end
    end
  end

  def select_by_followees
    if @followees.present?
      followees_criteria = Array(@followees.try(:map) {|key, value| value["id"]})

      @result_stocks.select! do |stock|
        followees_criteria.include?(stock["user"]["id"])
      end
    end
  end
end