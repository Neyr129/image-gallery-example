class AddImgAttachmentToImages < ActiveRecord::Migration
  def up
    add_attachment :images, :img
  end

  def down
    remove_attachment :images, :img
  end
end
