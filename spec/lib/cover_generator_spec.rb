require "cover_generator"
require "rspec"

describe CoverGenerator do
  it "generates a cover html and coffeescript file with given name" do
    allow(STDOUT).to receive(:puts)
    allow(STDOUT).to receive(:print)
    allow(STDIN).to receive(:gets).and_return(double(strip: "Elephant Cover"))
    cover_generator = CoverGenerator.new("/home")
    allow(cover_generator).to receive(:open)

    cover_generator.create

    expect(cover_generator).to have_received(:open).with(
      "/home/source/covers/elephant_cover.html.haml", "w"
    )
    expect(cover_generator).to have_received(:open).with(
      "/home/source/javascripts/covers/elephant_cover.coffee", "w"
    )
  end
end

#describe PostCreator, "#create" do
#  before do
#    allow(STDOUT).to receive(:print)
#    allow(STDOUT).to receive(:puts)
#  end
#
#  it "does not try to create a directory that already exists" do
#    allow(Dir).to receive(:exist?).and_return(true)
#    allow(Dir).to receive(:[]).and_return(["/source/robots.thoughtbot.com/source/posts/2014/06-03-test.html.markdown"])
#    allow(File).to receive(:exist?).and_return(false)
#    allow(STDIN).to receive(:gets).and_return(double(strip: "test"))
#    allow(FileUtils).to receive(:mkdir)
#    post_creator = PostCreator.new("directory")
#    allow(post_creator).to receive(:open)
#
#    post_creator.create
#
#    expect(FileUtils).to_not have_received(:mkdir)
#  end
#
#  it "generates a filename with a future date" do
#    allow(Dir).to receive(:[]).and_return([
#      "/source/robots.thoughtbot.com/source/posts/2011/07-03-test.html.markdown",
#      "/source/robots.thoughtbot.com/source/posts/2014/06-09-test.html.markdown",
#      "/source/robots.thoughtbot.com/source/posts/2010/01-03-test.html.markdown",
#      "/source/robots.thoughtbot.com/source/posts/2014/06-02-test.html.markdown",
#    ])
#    allow(Dir).to receive(:exist?).and_return(true)
#    allow(File).to receive(:exist?).and_return(false)
#    allow(STDIN).to receive(:gets).and_return(double(strip: "Test Post"))
#    post_creator = PostCreator.new("")
#    allow(post_creator).to receive(:open)
#
#    post_creator.create
#
#    expect(post_creator).to have_received(:open).with(
#      "/source/posts/2014/06-10-test-post.md", "w"
#    )
#  end
#end
