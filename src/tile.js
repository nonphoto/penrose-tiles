import { degToRad } from './util'
import { Vector2 } from 'three'

const alpha = degToRad(18)
const beta = degToRad(36)

export default class Tile {
    constructor(type) {
        this.type = type || false
        this.position = new Vector2()
        this.dimensions = new Vector2()
        this.rotation = 0

        this.internalAngle = type ? alpha : beta
        this.dimensions.x = Math.cos(this.internalAngle)
        this.dimensions.y = Math.sin(this.internalAngle)

        this.path = new Path2D()
        this.path.moveTo(this.dimensions.x, 0)
        this.path.lineTo(0, -this.dimensions.y)
        this.path.lineTo(-this.dimensions.x, 0)
        this.path.lineTo(0, this.dimensions.y)
        this.path.closePath()
    }

    get edgeTransform() {
        const v = new Vector2(this.dimensions.x / 2, this.dimensions.y / 2)
        return v.rotateAround(new Vector2(), this.rotation)
    }

    createNeighbor() {
        const that = new Tile(true)
        that.rotation = this.rotation + Math.PI - this.internalAngle + that.internalAngle
        that.position = this.position.clone().add(this.edgeTransform).sub(that.edgeTransform)
        return that
    }

    draw(context) {
        context.save()
        context.translate(this.position.x, this.position.y)
        context.rotate(this.rotation)
        context.stroke(this.path)
        context.restore()
    }
}