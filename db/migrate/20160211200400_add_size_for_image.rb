class AddSizeForImage < ActiveRecord::Migration
  def change
    add_column :images, :size, :text
  end
end
