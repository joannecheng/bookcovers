import processing.core._
import megamu.mesh._;

object RubyScience extends PApplet {
  private var mySketch:RubyScience = _

  def main() = {
    mySketch = new RubyScience

    val frame = new javax.swing.JFrame("Ruby Science")
    frame.getContentPane().add(mySketch)
    mySketch.init

    frame.setSize(540, 540)
    frame.setVisible(true)
  }
}

class RubyScience extends PApplet {
  val dotSpacing = 50
  val padding = 20
  val w = 500
  val numDotsRow = w / dotSpacing

  override def setup() = {
    size(w + padding*2, w + padding*2)
    background(200)
    frameRate(1)
  }

  override def draw() {
    val points = generatePoints
    val gemPoints = generateGemPoints
    val allPointsDelaunay = new Delaunay((points ++ gemPoints).toArray)
    val gemDelaunay = new Delaunay(gemPoints.toArray)

    val allEdges = allPointsDelaunay.getEdges
    val gemEdges = gemDelaunay.getEdges

    val gem = new Hull(gemPoints.toArray)

    background(200)
    stroke(255)

    fill(128, 15, 15)
    gem.getRegion().draw(this)

    drawEdges(allEdges, 1)
    drawEdges(gemEdges, 2)
  }

  def generatePoints() = {
    val range = 5
    (1 to numDotsRow).flatMap { i =>
      val yVal = i * dotSpacing
      (1 to numDotsRow).map { j =>
        val xVal = j * dotSpacing + pointOffset(i)
        Array[Float](random(xVal-range, xVal+range), random(yVal-range, yVal+range))
      }
    }
  }

  def pointOffset(yVal: Int) = {
    if (yVal % 2 == 0) {
      dotSpacing/2
    }
    else {
      0
    }
  }

  def generateGemPoints() = {
    (0 to numDotsRow).map { i =>
      Array[Float](random(w/4, 3*(width-padding)/4), random(height/4, 3*(height-padding)/4))
    }
  }

  def drawEdges(edges: Array[Array[Float]], sweight: Int) {
    strokeWeight(sweight)
    edges.foreach { edge =>
      line(edge(0), edge(1), edge(2), edge(3))
    }
  }
}

//RubyScience.main()
