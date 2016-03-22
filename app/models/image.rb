class Image < ActiveRecord::Base
  before_save  :extract_size
  serialize    :size

  has_attached_file :img, styles: { medium: "600x600>", thumb: "100x100>" },
                    default_url: "/images/:style/missing.png",
                    path:  ':rails_root/public/:class/:attachment/:id/foto_:style.:extension',
                    url:   '/:class/:attachment/:id/foto_:style.:extension'



  validates_attachment :img, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png", "image/gif"] }



  private

    def extract_size
      tempfile = img.queued_for_write[:medium]
      unless tempfile.nil?
        geometry = Paperclip::Geometry.from_file(tempfile)
        self.size = [geometry.width.to_i, geometry.height.to_i]
      end
    end

end
