class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.text :ingredients
      t.text :description
      t.string :image_url
      t.integer :cost
      t.string :cusine
      t.string :type

      t.timestamps
    end
  end
end
