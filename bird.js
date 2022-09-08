const Bird = document.getElementById("bird")
const BIRD_SPEED = 0.25
const JUMP_DURATION = 125 // Milliseconds

let jumpDifference = Number.POSITIVE_INFINITY

export function setupBird() {
	setTop(window.innerHeight / 2)
	// Detect key press
	document.removeEventListener("keydown", handleJump)
	document.addEventListener("keydown", handleJump)
}
export function updateBird(delta) {
	if (jumpDifference < JUMP_DURATION) {
		setTop(getTop() - BIRD_SPEED * delta) // Move bird up
	} else {
		setTop(getTop() + BIRD_SPEED * delta) // Move bird down
	}

	jumpDifference += delta
}

export function getBirdRect() {
    return Bird.getBoundingClientRect()
}

function handleJump(key) {
	if (key.code !== "Space") return

	jumpDifference = 0
}

// Helper functions
function setTop(top) {
	Bird.style.setProperty("--bird-top", top)
}
function getTop() {
	return parseFloat(getComputedStyle(Bird).getPropertyValue("--bird-top"))
}
