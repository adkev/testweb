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

regal = Facility.find_or_create_by(name: 'Regal Mold & Die') do |facility|
  facility.city  = 'Elkhart'
  facility.state = 'IN'
  facility.square_footage = 28000
  facility.operating_since = '1996'
end

# Administrator.create!({
#   first_name: 'Rob',
#   last_name: 'Neyland',
#   email: 'ro3development@gmail.com',
#   facility: goodland
#   # password: 'adkev$',
#   # password_confirmation: 'adkev$'
# })

Administrator.create!({
  first_name: 'Adkev',
  last_name: 'Administrator',
  email: 'administrator@adkev.com',
  password: 'adkev$',
  password_confirmation: 'adkev$',
  facility: goodland
})

Publisher.create!({
  first_name: 'Adkev',
  last_name: 'Publisher',
  email: 'publisher@adkev.com',
  password: 'adkev$',
  password_confirmation: 'adkev$',
  facility: goodland
})

Employee.create!({
  first_name: 'Adkev',
  last_name: 'Employee',
  email: 'employee@adkev.com',
  password: 'adkev$',
  password_confirmation: 'adkev$',
  facility: goodland
})

Position.create!([
  {
    title: 'Human Resources Manager',
    description: "<p>The basic function of the position of Human Resources Manager is to manage employee salary, benefits and compensation programs; perform interviews and recruitment in a confidential manner; unemployment; Workers Compensation; all Federal employment regulation responsibilities; new position development; supervisory training and development; social and awards responsibility; general communication within company responsibility; development of policy and procedures for company handbook; responsible for overall planning and development of the company.&nbsp;</p>\r\n\r\n<ul>\r\n\t<li>Liaison between management and employees&nbsp;</li>\r\n\t<li>Recruit and interview applicants to maintain/retain workforce required to meet production orders</li>\r\n\t<li>Administer any pre-employment testing and prior employment verifications&nbsp;</li>\r\n\t<li>Provide Adkev, Inc. orientation training to new and temporary employees&nbsp;</li>\r\n\t<li>Assist supervisors in identifying training needs of all associates and implement programs or outside vendors to provide the training&nbsp;</li>\r\n\t<li>Responsible for TS16949 Element 18, Training&nbsp;</li>\r\n\t<li>Maintain on-line database and hardcopy personnel records and files to include training and personnel records, emergency contact info, attendance, and performance&nbsp;</li>\r\n</ul>\r\n",
    apply_link: 'http://google.com'
  },
  {
    title: 'New Position',
    description: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in consequat elit. Praesent vel nibh ultricies, varius urna nec, pharetra neque. Fusce consequat quis ex rhoncus sollicitudin. Phasellus at pharetra risus. Maecenas et elit lectus. Suspendisse suscipit ultricies varius. Nam molestie nunc et augue suscipit faucibus. Nulla facilisi. Donec condimentum magna vel libero viverra, vel aliquet mi porttitor. Integer enim magna, pellentesque nec felis non, consequat bibendum orci. Vivamus luctus eros tempus, euismod leo et, molestie sem. Vestibulum accumsan, turpis ac iaculis aliquet, ante turpis fermentum dolor, et feugiat nunc lectus eu eros. Aenean urna magna, tempor rutrum dignissim nec, sagittis ut lacus.</p><p>Praesent luctus, eros at rhoncus tempor, ipsum ante molestie augue, ut cursus mi mauris et neque. Sed congue, nisl vitae pellentesque elementum, ex lacus condimentum eros, euismod convallis sapien est nec nunc. Etiam tincidunt nulla sed metus suscipit, eu luctus nibh tempor. Proin ornare risus ut facilisis tincidunt. Pellentesque nunc purus, hendrerit non quam eu, aliquam tincidunt diam. Donec lacinia eros vitae justo ullamcorper rhoncus. Nam nulla ante, pellentesque id odio non, porta lacinia ipsum. Vestibulum ac lectus ut dolor commodo fermentum. Praesent consectetur a justo nec gravida. Suspendisse et venenatis ipsum. Cras porta tortor sit amet tortor ornare, at posuere diam sodales.</p>",
    apply_link: 'http://google.com'
  }
])

Post.create!([
  {
    user: Administrator.first,
    title: 'A new press has joined the Adkev family...',
    content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in consequat elit. Praesent vel nibh ultricies, varius urna nec, pharetra neque. Fusce consequat quis ex rhoncus sollicitudin. Phasellus at pharetra risus. Maecenas et elit lectus. Suspendisse suscipit ultricies varius. Nam molestie nunc et augue suscipit faucibus. Nulla facilisi. Donec condimentum magna vel libero viverra, vel aliquet mi porttitor. Integer enim magna, pellentesque nec felis non, consequat bibendum orci. Vivamus luctus eros tempus, euismod leo et, molestie sem. Vestibulum accumsan, turpis ac iaculis aliquet, ante turpis fermentum dolor, et feugiat nunc lectus eu eros. Aenean urna magna, tempor rutrum dignissim nec, sagittis ut lacus.</p><p>Praesent luctus, eros at rhoncus tempor, ipsum ante molestie augue, ut cursus mi mauris et neque. Sed congue, nisl vitae pellentesque elementum, ex lacus condimentum eros, euismod convallis sapien est nec nunc. Etiam tincidunt nulla sed metus suscipit, eu luctus nibh tempor. Proin ornare risus ut facilisis tincidunt. Pellentesque nunc purus, hendrerit non quam eu, aliquam tincidunt diam. Donec lacinia eros vitae justo ullamcorper rhoncus. Nam nulla ante, pellentesque id odio non, porta lacinia ipsum. Vestibulum ac lectus ut dolor commodo fermentum. Praesent consectetur a justo nec gravida. Suspendisse et venenatis ipsum. Cras porta tortor sit amet tortor ornare, at posuere diam sodales.</p>"
  },
  {
    user: Administrator.first,
    title: 'Give a warm welcome to our new head of tooling, Jeremy Stevens in Monticello!',
    content: "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>"
  }
])

Dir["#{Rails.root}/db/images/community/*"].each_with_index do |path, i|
  Slide::Community.create!({
    position: i + 1,
    image: File.new(path)
  })
end

Dir["#{Rails.root}/db/images/team/*"].each_with_index do |path, i|
  Slide::Team.create!({
    position: i + 1,
    image: File.new(path)
  })
end

Dir["#{Rails.root}/db/images/technique/*"].each_with_index do |path, i|
  Slide::Technique.create!({
    position: i + 1,
    image: File.new(path)
  })
end
