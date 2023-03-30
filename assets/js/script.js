'use strict'

/**
 * PRELOADER
 */

const preloader = document.querySelector('[data-preloader]')

window.addEventListener('DOMContentLoaded', function () {
	preloader.classList.add('loaded')
	document.body.classList.add('loaded')
})

/**
 * add event on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
	for (let i = 0, len = elements.length; i < len; i++) {
		elements[i].addEventListener(eventType, callback)
	}
}
/**
 * Mobile navbar toggle
 */

const navbar = document.querySelector('[data-navbar]')
const navTogglers = document.querySelectorAll('[data-nav-toggler]')
const navLinks = document.querySelectorAll('[data-nav-link]')
const overlay = document.querySelector('[data-overlay]')

addEventOnElements(navTogglers, 'click', function () {
	navbar.classList.toggle('active')
	overlay.classList.toggle('active')
	document.body.classList.toggle('nav-active')
})

overlay.addEventListener('click', function (event) {
	if (event.target.tagName === 'A') {
		const url = event.target.getAttribute('href')
		window.location.href = url
	}
})

addEventOnElements(navLinks, 'click', function () {
	navbar.classList.remove('active')
	overlay.classList.remove('active')
	document.body.classList.remove('nav-active')
})

/**
 * Header active
 */
const header = document.querySelector('[data-header]')
console.log('window scrolled')
window.addEventListener('scroll', function () {
	header.classList[window.scrollY > 100 ? 'add' : 'remove']('active')
})
// get all the navbar links
const navbarLinks = document.querySelectorAll('.navbar-link')

// loop through the links and add a click event listener
navbarLinks.forEach((link) => {
	link.addEventListener('click', (event) => {
		event.preventDefault()
		const targetId = link.getAttribute('href')
		const targetSection = document.querySelector(targetId)
		targetSection.scrollIntoView({ behavior: 'smooth' })
	})
})

// scroll into view
const extraSpace = 80 // adjust as needed

// Function to animate scrolling
function scrollThen(service) {
	// Get the target element
	const targetElement = document.getElementById(service)

	// Calculate the distance to the target element
	const distance = targetElement.getBoundingClientRect().top + window.scrollY

	// Scroll to the target element with an animation
	window.scroll({
		top: distance - extraSpace,
		behavior: 'smooth',
	})
}

/**
 * Element tilt effect
 */
const tiltElements = document.querySelectorAll('[data-tilt]')

const initTilt = function (event) {
	/** get tilt element center position */
	const centerX = this.offsetWidth / 2
	const centerY = this.offsetHeight / 2

	const tiltPosY = ((event.offsetX - centerX) / centerX) * 10
	const tiltPosX = ((event.offsetY - centerY) / centerY) * 10

	this.style.transform = `perspective(1000px) rotateX(${tiltPosX}deg) rotateY(${
		tiltPosY - tiltPosY * 2
	}deg)`
}

addEventOnElements(tiltElements, 'mousemove', initTilt)

addEventOnElements(tiltElements, 'mouseout', function () {
	this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`
})

/**
 * Tab content
 */

const tabBtns = document.querySelectorAll('[data-tab-btn]')
const tabContents = document.querySelectorAll('[data-tab-content]')

let lastActiveTabBtn = tabBtns[1]
let lastActiveTabContent = tabContents[1]

const filterContent = function () {
	if (!(lastActiveTabBtn === this)) {
		lastActiveTabBtn.classList.remove('active')
		lastActiveTabContent.classList.remove('active')

		this.classList.add('active')
		lastActiveTabBtn = this

		const currentTabContent = document.querySelector(
			`[data-tab-content="${this.dataset.tabBtn}"]`
		)

		currentTabContent.classList.add('active')
		lastActiveTabContent = currentTabContent
	}
}

addEventOnElements(tabBtns, 'click', filterContent)

/**
 * Custom cursor
 */

const cursors = document.querySelectorAll('[data-cursor]')
const hoveredElements = [
	...document.querySelectorAll('button'),
	...document.querySelectorAll('a'),
]

window.addEventListener('mousemove', function (event) {
	const posX = event.clientX
	const posY = event.clientY

	/** cursor dot position */
	cursors[0].style.left = `${posX}px`
	cursors[0].style.top = `${posY}px`

	/** cursor outline position */
	setTimeout(function () {
		cursors[1].style.left = `${posX}px`
		cursors[1].style.top = `${posY}px`
	}, 80)
})

/** add hovered class when mouseover on hoverElements */
addEventOnElements(hoveredElements, 'mouseover', function () {
	for (let i = 0, len = cursors.length; i < len; i++) {
		cursors[i].classList.add('hovered')
	}
})

/** remove hovered class when mouseout on hoverElements */
addEventOnElements(hoveredElements, 'mouseout', function () {
	for (let i = 0, len = cursors.length; i < len; i++) {
		cursors[i].classList.remove('hovered')
	}
})
const form = document.querySelector('#contact-form')

form.addEventListener('submit', (event) => {
	if (!form.checkValidity()) {
		event.preventDefault()
		// Handle the invalid form data here
		alert('Please fill out all required fields')
	}
})

const toggleButtons = document.querySelectorAll('.card-toggle')
const cards = document.querySelectorAll('.card')

// Add click event listener to document object
document.addEventListener('click', (event) => {
	// Loop through all the cards to check if the clicked element is within an expanded card
	cards.forEach((card) => {
		if (card.classList.contains('expanded') && !card.contains(event.target)) {
			// If the clicked element is not within the expanded card, collapse the card
			const cardToggle = card.querySelector('.card-toggle')
			card.classList.remove('expanded')
			card.classList.add('hidden')
			cardToggle.textContent = 'Read More'
			if (cardToggle.classList.contains('read-less')) {
				cardToggle.classList.remove('read-less')
			}
		}
	})
})

// Read More Read Less Logic

toggleButtons.forEach((button) => {
	button.addEventListener('click', (event) => {
		const card = event.target.closest('.card')
		const cardToggle = card.querySelector('.card-toggle')
		const cardContent = card.querySelector('.card-content')
		const firstListItem = cardContent.querySelector('li:first-child')

		if (card.classList.contains('expanded')) {
			card.classList.remove('expanded')
			card.classList.add('hidden')
			cardToggle.textContent = 'Read More'
			if (cardToggle.classList.contains('read-less')) {
				cardToggle.classList.remove('read-less')
			}
			firstListItem.classList.add('first-list-item-padding')
		} else {
			card.classList.remove('hidden')
			card.classList.add('expanded')
			cardToggle.textContent = 'Read Less'
			if (!cardToggle.classList.contains('read-more')) {
				cardToggle.classList.add('read-less')
			}
			firstListItem.classList.remove('first-list-item-padding')
		}
	})
})

// toggleButtons.forEach((button) => {
// 	button.addEventListener('click', (event) => {
// 		const card = event.target.closest('.card')
// 		const cardToggle = card.querySelector('.card-toggle')

// 		if (card.classList.contains('expanded')) {
// 			card.classList.remove('expanded')
// 			card.classList.add('hidden')
// 			cardToggle.textContent = 'Read More'
// 			if (cardToggle.classList.contains('read-less')) {
// 				cardToggle.classList.remove('read-less')
// 			}
// 		} else {
// 			card.classList.remove('hidden')
// 			card.classList.add('expanded')
// 			cardToggle.textContent = 'Read Less'
// 			if (!cardToggle.classList.contains('read-more')) {
// 				cardToggle.classList.add('read-less')
// 			}
// 		}
// 	})
// })
