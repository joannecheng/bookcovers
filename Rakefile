desc "Create html and js template for a new cover"
task :new do
  require './lib/cover_generator'
  toplevel_directory = Rake.application.find_rakefile_location[1]
  CoverGenerator.new(toplevel_directory).create
end
