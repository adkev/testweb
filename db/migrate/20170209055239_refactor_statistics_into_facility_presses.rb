# this is a one time migration for refactoring statistics (before the removal of the statistics model)

class RefactorStatisticsIntoFacilityPresses < ActiveRecord::Migration[5.0]
  def change
    if defined?(Statistic) && Statistic.count > 0 && Facility.count == 0
      # create facilities
      goodland = Facility.find_or_create_by(name: 'Adkev Corporate Office') do |facility|
        facility.address_line_1 = 'P.O. Box 390'
        facility.address_line_2 = '664 South Iroquois Street'
        facility.city  = 'Goodland'
        facility.state = 'IN'
        facility.zip   = '47948'
        facility.phone = '(219) 297-4484'
        facility.fax   = '(219) 297-3054'
        facility.square_footage = 152000
        facility.operating_since = '1987'
        facility.show_on_contact_form = true
      end

      monticello = Facility.find_or_create_by(name: 'Monticello Office') do |facility|
        facility.address_line_1 = '1207 North 6th Street'
        facility.city  = 'Monticello'
        facility.state = 'IN'
        facility.zip   = '47960'
        facility.phone = '(574) 583-4420'
        facility.fax   = '(574) 583-4408'
        facility.square_footage = 183000
        facility.operating_since = '2007'
        facility.show_on_contact_form = true
      end

      Facility.find_or_create_by(name: 'Regal Mold & Die') do |facility|
        facility.city  = 'Elkhart'
        facility.state = 'IN'
        facility.square_footage = 28000
        facility.operating_since = '1996'
      end

      Statistic.all.each do |stat|
        # create press
        press = Press.find_or_create_by(ton: stat.ton)

        # create facility presses
        goodland.facility_presses.create(press: press, quantity: stat.goodland_quantity)
        monticello.facility_presses.create(press: press, quantity: stat.monticello_quantity)
      end
    end
  end
end
