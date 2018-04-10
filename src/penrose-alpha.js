import Tile from './tile'

export default class PenroseAlpha extends Tile {
    constructor() {
        super()
    }

    draw(context) {
        const w = Math.cos(18 / 180 * Math.PI)
        const h = Math.sin(18 / 180 * Math.PI)

        context.beginPath()
        context.moveTo(w, 0)
        context.lineTo(0, h)
        context.lineTo(-w, 0)
        context.lineTo(0, -h)
        context.closePath()
        context.stroke()
    }
}