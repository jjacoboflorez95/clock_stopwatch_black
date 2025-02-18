//Assignment 3 Part 1: Develop the Clock application

"use strict";

const $ = (selector) => document.querySelector(selector);

/**
 * Function that adds a leading zero to single digits using a string method.
 * @param {*} num
 * @returns
 */
const padSingleDigit = (num) => num.toString().padStart(2, "0");

/**
 * Function that manage the time to display.
 */
const displayCurrentTime = () => {
	const now = new Date();
	let hours = now.getHours();
	let ampm = "AM"; // set default value

	// correct hours and AM/PM value for display
	if (hours > 12) {
		// convert from military time
		hours = hours - 12;
		ampm = "PM";
	} else {
		// adjust 12 noon and 12 midnight
		switch (hours) {
			case 12: // noon
				ampm = "PM";
				break;
			case 0: // midnight
				hours = 12;
				ampm = "AM";
		}
	}

	$("#hours").textContent = hours;
	$("#minutes").textContent = padSingleDigit(now.getMinutes());
	$("#seconds").textContent = padSingleDigit(now.getSeconds());
	$("#ampm").textContent = ampm;
};

//global stop watch timer variable and elapsed time object
let stopwatchTimer = null;
let elapsedMinutes = 0;
let elapsedSeconds = 0;
let elapsedMilliseconds = 0;

/**
 * Function that adds leading zeros to single or double digits using a string method.
 * @param {*} num
 * @returns
 */
const padSingleDoubleDigit = (num) => num.toString().padStart(3, "0");

/**
 * Function that manage the miliseconds of the Stopwatch.
 */
const tickStopwatch = () => {
	// increment milliseconds by 10 milliseconds
	elapsedMilliseconds += 10;

	// if milliseconds total 1000, increment seconds by one and reset milliseconds to zero
	if (elapsedMilliseconds == 1000) {
		elapsedSeconds++;
		elapsedMilliseconds = 0;
	}

	// if seconds total 60, increment minutes by one and reset seconds to zero
	if (elapsedSeconds == 60) {
		elapsedMinutes++;
		elapsedSeconds = 0;
	}

	//display new stopwatch time
	$("#s_minutes").textContent = padSingleDigit(elapsedMinutes);
	$("#s_seconds").textContent = padSingleDigit(elapsedSeconds);
	$("#s_ms").textContent = padSingleDoubleDigit(elapsedMilliseconds);
};

// event handler functions
/**
 * Function that manage the start of the Stopwatch.
 * @param {*} evt
 */
const startStopwatch = (evt) => {
	// do first tick of stop watch and then set interval timer to tick
	// stop watch every 10 milliseconds. Store timer object in stopwatchTimer
	// variable so next two functions can stop timer.
	if (!stopwatchTimer) { 
        stopwatchTimer = setInterval(tickStopwatch, 10);
    }

	// prevent default action of link
	evt.preventDefault();
};

/**
 * Function that manage the stop of the Stopwatch.
 * @param {*} evt
 */
const stopStopwatch = (evt) => {
	// stop timer
	clearInterval(stopwatchTimer);
	stopwatchTimer = null;
	// prevent default action of link
	evt.preventDefault();
};

/**
 * Function that manage the reset of the Stopwatch.
 * @param {*} evt
 */
const resetStopwatch = (evt) => {
	// stop timer
	clearInterval(stopwatchTimer);
	stopwatchTimer = null;
	// reset elapsed variables and clear stopwatch display
	$("#s_minutes").textContent = padSingleDigit("00");
	$("#s_seconds").textContent = padSingleDigit("00");
	$("#s_ms").textContent = padSingleDoubleDigit("000");
	// prevent default action of link
	evt.preventDefault();
};

document.addEventListener("DOMContentLoaded", () => {
	// set initial clock display and then set interval timer to display
	// new time every second. Don't store timer object because it
	// won't be needed - clock will just run.
	displayCurrentTime();
	setInterval(displayCurrentTime, 1000);

	// set up stopwatch event handlers
	$("#start").addEventListener("click", startStopwatch);
	$("#stop").addEventListener("click", stopStopwatch);
	$("#reset").addEventListener("click", resetStopwatch);
});
