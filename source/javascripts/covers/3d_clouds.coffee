setScene = ->
  scene = new THREE.Scene()
  scene

setRenderer = ->
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(w, h)
  renderer

w = 600
h = 500

# field of view, aspect ratio, near/far cipping pane
scene = new setScene()
camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000)
renderer = setRenderer(w, h)

radius = 100
segments = 32
rings = 32
sphereGeometry = new THREE.SphereGeometry(radius, segments, rings)
material = new THREE.MeshLambertMaterial(color: 0xaa3300)
sphere = new THREE.Mesh(sphereGeometry, material)

pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.x = 10
pointLight.position.y = 50
pointLight.position.z = 250

scene.add(sphere)
scene.add(pointLight)

camera.position.z = 300

render = ->
  sphere.rotation.x += 0.01
  sphere.rotation.y += 0.01
  requestAnimationFrame(render)
  renderer.render(scene, camera)

render()
