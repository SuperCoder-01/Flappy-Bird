const HOLE_HEIGHT = 120
const PIPE_WIDTH = 60
const PIPE_INTERVAL = 1500 // Milliseconds
const PIPE_SPEED = 0.5
let pipes = []
let pipeDifference
export let score

export function setupPipes() {
    setPropertyOf(document.documentElement, "--pipe-width", PIPE_WIDTH)
    setPropertyOf(document.documentElement, "--hole-height", HOLE_HEIGHT)
    // Remove pipes on screen
    pipes = []
    const PipesOnScreen = document.querySelectorAll(".pipe")
    PipesOnScreen.forEach(pipe => {
        pipe.remove()
    })

    pipeDifference = PIPE_INTERVAL
    score = 0
}

export function updatePipes(delta) {
	pipeDifference += delta

	if (pipeDifference > PIPE_INTERVAL) {
		pipeDifference -= PIPE_INTERVAL
		createPipe()
	}

    pipes.forEach(pipe => {
        if (getPropertyOf(pipe, "--pipe-left") + PIPE_WIDTH < 0) {
            score++
            // Remove pipe
            pipes.shift()
            document.body.removeChild(pipe)
            return
        }
		setPropertyOf(pipe, "--pipe-left", getPropertyOf(pipe, "--pipe-left") - delta * PIPE_SPEED)
	})
}

export function getPipeRects() {
    return pipes.flatMap(pipe => [getRectsOf(pipe.firstChild), getRectsOf(pipe.lastChild)])
}

function createPipe() {
	const Pipe = document.createElement("div")
	const PipeTop = createPipeSegment("top")
	const PipeBottom = createPipeSegment("bottom")
	Pipe.append(PipeTop)
	Pipe.append(PipeBottom)
	Pipe.classList.add("pipe")
	setPropertyOf(
		Pipe,
		"--hole-top",
		random(HOLE_HEIGHT * 1.5, window.innerHeight - HOLE_HEIGHT * 0.5)
    )

	setPropertyOf(Pipe, "--pipe-left", window.innerWidth)
	document.body.append(Pipe)
	pipes.push(Pipe)
}
function createPipeSegment(pos) {
	const Segment = document.createElement("div")
	Segment.classList.add("segment", pos)
	return Segment
}

// Helper functions
function getPropertyOf(elem, property) {
	return getComputedStyle(elem).getPropertyValue(property)
}
function setPropertyOf(elem, property, value) {
	elem.style.setProperty(property, value)
}

function getRectsOf(elem) {
    return elem.getBoundingClientRect()
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}