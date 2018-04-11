export function degToRad(a) {
    return a / 180 * Math.PI
}

export function radToDeg(a) {
    return a / Math.PI * 180
}

export function matrixToTransform(m) {
    const [a, b, c, d, e, f, g, h, i] = m.elements
    return [a, b, d, e, g, h]
}

export const Edge = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,

    opposite: (e) => {
        if (e % 2 === 0) {
            return e + 1
        }
        else {
            return e - 1
        }
    }
}

export const Direction = {
    NE: 0,
    NW: 1,
    SW: 2,
    SE: 3,
    count: 4
}
