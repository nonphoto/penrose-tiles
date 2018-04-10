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