import processing.core._
import megamu.mesh._;

object RubyScience extends PApplet {
  private var mySketch:RubyScience = _

  def main() = {
    mySketch = new RubyScience

    val frame = new javax.swing.JFrame("Ruby Science")
    frame.getContentPane().add(mySketch)
    mySketch.init

    frame.setSize(520, 520)
    frame.setVisible(true)
  }
}

class RubyScience extends PApplet {
  val dotSpacing = 25
  val padding = 10
  val w = 500
  val numDotsRow = w / dotSpacing
  var points = IndexedSeq[Array[Float]]()
  var myDelaunay: Option[Delaunay] = None

  override def setup() = {
    size(w + padding*2, w + padding*2)
    background(200)
    smooth()
    frameRate(1)
  }

  override def draw() ={
    points = (0 to numDotsRow).map { i =>
      Array[Float](random(padding, w), random(padding, w))
    }
    myDelaunay = Some(new Delaunay(points.toArray))

    background(200)
    stroke(255)
    strokeWeight(3)
    val edges = myDelaunay.get.getEdges
    val hull = new Hull(points.toArray)

    fill(255, 0, 0)
    hull.getRegion().draw(this)

    edges.foreach { edge =>
      line(edge(0), edge(1), edge(2), edge(3))
    }

    points.foreach { point =>
      noStroke()
      ellipse(point(0), point(1), 3, 3)
    }
  }
}

RubyScience.main()
