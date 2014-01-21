class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name
      t.string :address
      t.string :city
      t.string :state
      t.float :latitude
      t.float :longitude
      t.text :description
      t.string :title

      t.timestamps
    end
  end
end
