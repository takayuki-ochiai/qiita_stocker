class CreateStocks < ActiveRecord::Migration
  def change
    create_table :stocks do |t|
      t.string :title
      t.string :url
      t.string :user_id
      t.date :post_date

      t.timestamps null: false
    end
  end
end
