json.array!(@locations) do |location|
  json.extract! location, :name, :address, :city, :state, :latitude, :longitude, :description, :title
  json.url location_url(location, format: :json)
end