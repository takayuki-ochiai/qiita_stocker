class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :stock_id
      t.string :name
      t.string :url

      t.timestamps null: false
    end
  end
end
