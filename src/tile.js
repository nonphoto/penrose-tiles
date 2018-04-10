import { degToRad, matrixToTransform } from './util'
import { Matrix3 } from 'three'

export default class Tile {
    constructor(transform, alt) {
        this.transform = transform || new Matrix3()
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
        context.save()
        context.transform(...matrixToTransform(this.transform))
        context.stroke(this.path)
        context.restore()
    }
}