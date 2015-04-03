w = 1000
h = 800

scene = new THREE.Scene()
renderer = new THREE.WebGLRenderer()
camera = new THREE.PerspectiveCamera(
  75, w/h, 0.1, 1000
)

renderer.setSize(w, h)

geometry = new THREE.BoxGeometry(0.75, 0.75, 0.75)
material = new THREE.MeshLambertMaterial(color: 0xFF00FF)

cubes = _.map [0..40], ->
  cube = new THREE.Mesh(geometry, material)
  cube.position.x = Math.random() * 8 - 4
  cube.position.y = Math.random() * 8 - 4
  cube.position.z = Math.random() * 8 - 6
  cube.rotationAngleX = Math.random() * 0.01 - 0.005
  cube.rotationAngleY = Math.random() * 0.01 - 0.005

  cube.rotation.x = Math.random()
  cube.rotation.y = Math.random()
  scene.add(cube)
  cube

pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.x = 10
pointLight.position.y = 50
pointLight.position.z = 250

scene.add(pointLight)

render = ->
  _.each(cubes, (cube) =>
    cube.rotation.x += cube.rotationAngleX
    cube.rotation.y += cube.rotationAngleY
  )
  requestAnimationFrame(render)
  renderer.render(scene, camera)

camera.position.z = 6

render()

$("#book_cover").append(renderer.domElement)
