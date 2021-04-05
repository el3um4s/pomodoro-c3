import Globals from "./globals.js";

const everyMilliseconds = 500;

export function start() {
	Globals.milliseconds = 0;
	Globals.paused = null;
	Globals.millisecondsPaused = 0;
	Globals.start = Date.now();
	globalThis.clearInterval(Globals.intervalID);
	Globals.intervalID = globalThis.setInterval(secondsElapsed, everyMilliseconds);
}

export function stop() {
	globalThis.clearInterval(Globals.intervalID)
}

export function pause() {
	Globals.paused = Date.now();
}

export function resume() {
	const millis = Date.now() - Globals.paused;
	Globals.millisecondsPaused += millis;
	Globals.paused = null;
}

function secondsElapsed(){
	g_runtime.callFunction("Pomodoro_ClockUpdate");
	const millis = Date.now() - Globals.start - Globals.millisecondsPaused;
	if ( !Globals.paused ) { 
		Globals.milliseconds = millis;
		
		const timeToPause = (g_runtime.globalVars.TimerDuration * 1000) - Globals.milliseconds;
		if (timeToPause <= 0) {
			Renderer.endPomodoroTime();
			g_runtime.globalVars.Status = "STOP";
			g_runtime.callFunction("Pomodoro_TimerControl", "STOP");
		}
	}
}
