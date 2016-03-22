namespace :images do

  desc "get images sizes"
  task :get_sizes => :environment do
    Image.all.each do | image |
      size = Paperclip::Geometry.from_file(image.img.path(:medium)).to_s.split("x").map {| d | d.to_i }
      image.update( size: size )
      puts "#{image.size}"
    end
  end

end