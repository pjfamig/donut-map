require 'spec_helper'

describe "locations/index" do
  before(:each) do
    assign(:locations, [
      stub_model(Location,
        :name => "Name",
        :address => "Address",
        :city => "City",
        :state => "State",
        :latitude => 1.5,
        :longitude => 1.5,
        :description => "MyText",
        :title => "Title"
      ),
      stub_model(Location,
        :name => "Name",
        :address => "Address",
        :city => "City",
        :state => "State",
        :latitude => 1.5,
        :longitude => 1.5,
        :description => "MyText",
        :title => "Title"
      )
    ])
  end

  it "renders a list of locations" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Address".to_s, :count => 2
    assert_select "tr>td", :text => "City".to_s, :count => 2
    assert_select "tr>td", :text => "State".to_s, :count => 2
    assert_select "tr>td", :text => 1.5.to_s, :count => 2
    assert_select "tr>td", :text => 1.5.to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "Title".to_s, :count => 2
  end
end
