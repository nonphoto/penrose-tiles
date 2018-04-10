import { Matrix3 } from 'three'
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

const leftTransform = new Matrix3()
leftTransform.setUvTransform(-2, 0, 1, 1, 0, 0, 0)
const leftTile = new Tile(leftTransform, false)
tilesInView.add(leftTile)

const rightTransform = new Matrix3()
rightTransform.setUvTransform(2, 0, 1, 1, 0, 0, 0)
const rightTile = new Tile(rightTransform, true)
tilesInView.add(rightTile)

function draw() {
    requestAnimationFrame(draw)

    for (let tile of tilesInView) {
        tile.draw(context)
    }
}

requestAnimationFrame(draw)