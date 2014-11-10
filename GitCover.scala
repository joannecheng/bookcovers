import processing.core._
import java.util.Random

object GitCover extends PApplet {
  private var mySketch:GitCover = _

  def main() = {
    mySketch = new GitCover

    val frame = new javax.swing.JFrame("GitCover")
    frame.getContentPane().add(mySketch)
    mySketch.init

    frame.setSize(1000, 1000)
    frame.setVisible(true)
  }
}

class GitCover extends PApplet {
  override def setup() = {
    size(1000, 1000)
    background(3)
    fill(200, 100, 200)
    ellipse(50, 50 , 50, 50)
    frameRate(1)
  }

  override def draw() ={
    var nodes = new GraphNodes(random(150, 220).toInt)
    background(3)
    stroke(255)

    nodes.render
  }

  class GraphNodes(numNodes: Int) {
    val nodes = (1 to numNodes).map { _ =>
      val w = 950
      new GraphNode(random(20, w), random(20, w), random(2, 8))
    }

    def render {
      for (node <- nodes) {
        node.render
        renderLinks(node)
      }
    }

    def renderLinks(givenNode: GraphNode) {
      strokeWeight(1)
      stroke(255, 80)

      for (node <- nodes) {
        if (node != givenNode) {
          val d = dist(node.x, node.y, givenNode.x, givenNode.y)
          if (d < maxDist)
            line(node.x, node.y, givenNode.x, givenNode.y)
        }
      }
    }

    private def dist(x1: Float, y1: Float, x2: Float, y2: Float) = {
      val dx = x1 - x2;
      val dy = y1 - y2;
      math.sqrt(dx*dx + dy*dy)
    }

    private val maxDist = 120
  }

  class GraphNode(val x: Float, val y: Float, val r: Float) {
    var device = true
    val fillColor = color(120, 200, 200, 80)

    def render {
      stroke(255, 130)
      fill(fillColor)
      ellipse(x, y, r, r)
    }
  }
}

GitCover.main()
