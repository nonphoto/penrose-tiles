import { degToRad, Edge, Direction } from './util'
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

        if (type) {
            this.edgesByDirection = [Edge.c, Edge.d, Edge.a, Edge.b]
            this.directionsByEdge = [Direction.SW, Direction.SE, Direction.NE, Direction.NW]
        }
        else {
            this.edgesByDirection = [Edge.a, Edge.c, Edge.d, Edge.b]
            this.directionsByEdge = [Direction.NE, Direction.SE, Direction.NW, Direction.SW]
        }

        const x = this.dimensions.x / 2
        const y = this.dimensions.y / 2
        this.positionsByDirection = [
            new Vector2(x, -y),
            new Vector2(-x, -y),
            new Vector2(-x, y),
            new Vector2(x, y),
        ]

        this.rotationsByDirection = [
            this.internalAngle,
            -this.internalAngle,
            Math.PI + this.internalAngle,
            Math.PI - this.internalAngle
        ]
    }

    createNeighbors() {
        const neighbors = []

        for (let direction = 0; direction < Direction.count; direction++) {
            const neighbor = new Tile(Math.random() > 0.5)
            const edge = this.edgesByDirection[direction]
            const neighborEdge = Edge.opposite(edge)
            const neighborDirection = neighbor.directionsByEdge[neighborEdge]

            neighbor.rotation = this.rotationsByDirection[direction] - neighbor.rotationsByDirection[neighborDirection] + Math.PI

            const toEdge = this.positionsByDirection[direction].clone().rotateAround(new Vector2(), this.rotation)
            const toNeighborEdge = neighbor.positionsByDirection[neighborDirection].clone().rotateAround(new Vector2(), neighbor.rotation)
            neighbor.position = toEdge.sub(toNeighborEdge)

            neighbors.push(neighbor)
        }

        return neighbors
    }

    draw(context) {
        context.save()

        context.strokeStyle = 'gray'
        context.translate(this.position.x, this.position.y)
        context.rotate(this.rotation)
        context.stroke(this.path)

        context.lineWidth = 0.1
        if (this.type) {
            context.strokeStyle = 'yellow'
            context.beginPath()
            context.arc(0, -this.dimensions.y, 0.2, this.internalAngle, Math.PI - this.internalAngle)
            context.stroke()

            context.strokeStyle = 'red'
            context.beginPath()
            context.arc(0, this.dimensions.y, 0.2, Math.PI + this.internalAngle, -this.internalAngle)
            context.stroke()
        }
        else {
            context.strokeStyle = 'yellow'
            context.beginPath()
            context.arc(-this.dimensions.x, 0, 0.2, -this.internalAngle, this.internalAngle)
            context.stroke()

            context.strokeStyle = 'red'
            context.beginPath()
            context.arc(this.dimensions.x, 0, 0.8, Math.PI - this.internalAngle, Math.PI + this.internalAngle)
            context.stroke()
        }

        context.restore()
    }
}