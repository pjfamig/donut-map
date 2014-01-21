require 'spec_helper'

describe "locations/new" do
  before(:each) do
    assign(:location, stub_model(Location,
      :name => "MyString",
      :address => "MyString",
      :city => "MyString",
      :state => "MyString",
      :latitude => 1.5,
      :longitude => 1.5,
      :description => "MyText",
      :title => "MyString"
    ).as_new_record)
  end

  it "renders new location form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", locations_path, "post" do
      assert_select "input#location_name[name=?]", "location[name]"
      assert_select "input#location_address[name=?]", "location[address]"
      assert_select "input#location_city[name=?]", "location[city]"
      assert_select "input#location_state[name=?]", "location[state]"
      assert_select "input#location_latitude[name=?]", "location[latitude]"
      assert_select "input#location_longitude[name=?]", "location[longitude]"
      assert_select "textarea#location_description[name=?]", "location[description]"
      assert_select "input#location_title[name=?]", "location[title]"
    end
  end
end
