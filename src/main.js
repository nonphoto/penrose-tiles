import Tile from './tile'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

const scale = 100
context.strokeStyle = 'white'
context.lineWidth = 1 / scale

context.translate(canvas.width / 2, canvas.height / 2)
context.scale(scale, scale)

const tilesInView = new Set()

tilesInView.add(new Tile(false))
tilesInView.add(new Tile(true))

function draw() {
    requestAnimationFrame(draw)

    for (let tile of tilesInView) {
        tile.draw(context)
    }
}

requestAnimationFrame(draw)