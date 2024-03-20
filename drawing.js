const canvas = document.getElementById('mycanvas')
const ctx = canvas.getContext("2d");
canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

function clearCanvas() {
    console.log("test");
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function getMousePos(event) {
    return {
        x: event.offsetX,
        y: event.offsetY
    };
}


// tool = 1 is normal drawing
// tool = 2 is line
// tool = 3 is rectangle
// tool = 4 is circle
let drawing = false, tool = 1,
    init, snap

function changeTool(element) {
    tool = element.dataset.val
}
canvas.addEventListener('mousedown', (e) => {
    drawing = true
    init = getMousePos(e)
    snap = ctx.getImageData(0, 0, canvas.width, canvas.height)
    if (tool == 1) {
        ctx.beginPath()
    }
})
canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        ctx.putImageData(snap, 0, 0)
        let finalPos = getMousePos(e)
        if (tool == 1) {
            ctx.lineTo(finalPos.x, finalPos.y)
            ctx.stroke()
        }
        else if (tool == 2) {
            ctx.beginPath()
            ctx.moveTo(init.x, init.y)
            ctx.lineTo(finalPos.x, finalPos.y)
            ctx.stroke()
        }
        else if (tool == 3)
            ctx.strokeRect(init.x, init.y, e.offsetX - init.x, e.offsetY - init.y)
        else if (tool == 4) {
            ctx.beginPath()
            ctx.arc(init.x, init.y, Math.sqrt(Math.pow((init.x - finalPos.x), 2) + Math.pow((init.y - finalPos.y), 2)), 0, 2 * Math.PI)
            ctx.stroke()
        }
    }
})
canvas.addEventListener('mouseup', () => {
    snap = ctx.getImageData(0, 0, canvas.width, canvas.height)
    drawing = false
})
console.log(ctx);