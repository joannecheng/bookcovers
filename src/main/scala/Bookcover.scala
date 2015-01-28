package com.bookcover

import processing.core._

object Bookcover extends PApplet {
  def main(mySketch: PApplet) = {
    val frame = new javax.swing.JFrame("GitCover")
    frame.getContentPane().add(mySketch)
    mySketch.init

    frame.setSize(1000, 1000)
    frame.setVisible(true)
  }
}
