class Location < ActiveRecord::Base

  def self.search(search)
    if search.present?
      where("name @@ :q or address @@ :q", q: search)     
    else
      find(:all)
    end
  end
  
end
