require 'spec_helper'

describe "Static pages" do

  describe "Home page" do

    it "should have the content 'Donut Map'" do
      visit '/static_pages/home'
      expect(page).to have_content('Donut Map')
    end
    
    it "should have the base title" do
      visit '/static_pages/home'
      expect(page).to have_title("Donut Map")
    end
    
    it "should not have a custom page title" do
      visit '/static_pages/home'
      expect(page).not_to have_title('| Home')
    end
  end
  
  describe "About page" do

    it "should have the content 'About Us'" do
      visit '/static_pages/about'
      expect(page).to have_content('About Us')
    end
    
    it "should have the title 'About Us'" do
      visit '/static_pages/about'
      expect(page).to have_title("Donut Map | About Us")
    end
  end
end