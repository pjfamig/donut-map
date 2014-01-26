class SearchSuggestion < ActiveRecord::Base
  def self.terms_for(prefix)
    Rails.cache.fetch(["search-terms", prefix]) do
      suggestions = where("term like ?", "#{prefix}_%")
      suggestions.order("popularity desc").limit(10).pluck(:term)
    end
  end
  
  def self.index_locations
    Location.find_each do |location|
      index_term(location.name)
      location.name.split.each { |t| index_term(t) }
      index_term(location.address)
      location.address.split.each { |r| index_term (r) }
      #ill need to update this address split...
      index_term(location.city)
    end
  end

  def self.index_term(term)
    where(term: term.downcase).first_or_initialize.tap do |suggestion|
      suggestion.increment! :popularity
    end
  end
end
