class Location < ActiveRecord::Base

  def self.search(search)
    if search
      find(:all, :conditions => ['LOWER(name) LIKE ?', "%#{search}%"])
    else
      find(:all)
    end
  end
  
end
