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
const firstTile = new Tile()
const secondTile = firstTile.createNeighbor()
tilesInView.add(firstTile)
tilesInView.add(secondTile)

function draw() {
    requestAnimationFrame(draw)

    for (let tile of tilesInView) {
        tile.draw(context)
    }
}

requestAnimationFrame(draw)