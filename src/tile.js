import { degToRad } from './util'

export default class Tile {
    constructor(alt) {
        this.alt = alt
        this.a = alt ? degToRad(18) : degToRad(36)
        this.w = Math.cos(this.a)
        this.h = Math.sin(this.a)
    }

    draw(context) {
        context.beginPath()
        context.moveTo(this.w, 0)
        context.lineTo(0, this.h)
        context.lineTo(-this.w, 0)
        context.lineTo(0, -this.h)
        context.closePath()
        context.stroke()
    }
}