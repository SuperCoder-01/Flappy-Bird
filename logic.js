import { updateBird, setupBird, getBirdRect } from "./bird.js"
import { updatePipes, setupPipes, score, getPipeRects } from "./pipe.js";

document.addEventListener("keydown", handleStart, { once: true })
const Title = document.getElementById("title")
const Subtitle = document.getElementById("subtitle")

let lastTime
function updateLoop(time) {
	if (lastTime == null) {
		lastTime = time
		window.requestAnimationFrame(updateLoop)
		return
	}
	const delta = time - lastTime // Difference between time and lastTime
	updateBird(delta)
	updatePipes(delta)
	if (checkLose()) return handleLose()
	lastTime = time
	window.requestAnimationFrame(updateLoop)
}

function checkLose() {
	const BirdRect = getBirdRect()
	const insidePipe = getPipeRects().some(rect => isCollision(BirdRect, rect))
	const OutsideWorld = BirdRect.top < 0 || BirdRect.bottom > window.innerHeight
	return OutsideWorld || insidePipe
}

function isCollision(rect1, rect2) {
	return (
		rect1.left < rect2.right &&
		rect1.top < rect2.bottom &&
		rect1.right > rect2.left &&
		rect1.bottom > rect2.top
	)
}

function handleStart() {
	Title.classList.add("hidden")
	setupBird()
	setupPipes()
	lastTime = null
	window.requestAnimationFrame(updateLoop)
}
function handleLose() {
	setTimeout(() => {
		Title.classList.remove("hidden")
		Subtitle.classList.remove("hidden")
		Subtitle.textContent = `${score} Pipes`
		document.addEventListener("keydown", handleStart, { once: true })
	}, 100);
}