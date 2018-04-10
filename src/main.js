const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

context.clearRect()
context.fillRect()

function draw() {
    requestAnimationFrame(draw)

    // Draw here
}

requestAnimationFrame(draw)