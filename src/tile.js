import { degToRad } from './util'

export default class Tile {
    constructor(alt) {
        this.alt = alt

        this.a = alt ? degToRad(18) : degToRad(36)
        this.w = Math.cos(this.a)
        this.h = Math.sin(this.a)

        this.path = new Path2D()
        this.path.moveTo(this.w, 0)
        this.path.lineTo(0, this.h)
        this.path.lineTo(-this.w, 0)
        this.path.lineTo(0, -this.h)
        this.path.closePath()
    }

    draw(context) {
        context.stroke(this.path)
    }
}