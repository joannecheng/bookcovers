class CoverGenerator
  COVER_JS_DIRECTORY = "/source/javascripts/covers/"
  COVER_HTML_DIRECTORY = "/source/covers/"

  def initialize(toplevel_directory)
    @toplevel_directory = toplevel_directory
  end

  def create
    STDOUT.print "Please enter cover name: "
    cover_name = STDIN.gets.strip
    slug = cover_name.downcase.gsub(/[^A-Za-z0-9 ]/, "").strip.gsub(" ", "_")

    open(javascript_file_name(slug), "w")
    open(haml_file_name(slug), "w").write(haml_template(slug, cover_name))
  end

  private

  attr_reader :toplevel_directory

  def haml_template(slug, cover_name)
    <<-eos
%header
  %h1= #{cover_name}

  %canvas#book_cover{height: 980, width: 653}
  .canvas-to-svg Save as SVG
  %script{src: "../javascripts/covers/#{slug}.js", type: "text/paperscript", canvas: "book_cover"}
    eos
  end

  def javascript_file_name(slug)
    "#{toplevel_directory}#{COVER_JS_DIRECTORY}#{slug}.coffee"
  end

  def haml_file_name(slug)
    "#{toplevel_directory}#{COVER_HTML_DIRECTORY}#{slug}.html.haml"
  end
end
