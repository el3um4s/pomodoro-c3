"use strict";

import Globals from "./globals.js";
import * as TimerClock from "./timerClock.js";


{
	const scriptsInEvents = {

		async Main_Event4_Act1(runtime, localVars)
		{
			localVars.TimeToPause = (runtime.globalVars.TimerDuration * 1000) - Globals.milliseconds;
		},

		async Main_Event17_Act1(runtime, localVars)
		{
			TimerClock.stop();
		},

		async Main_Event18_Act1(runtime, localVars)
		{
			TimerClock.start();
		},

		async Main_Event19_Act1(runtime, localVars)
		{
			TimerClock.pause();
		},

		async Main_Event20_Act1(runtime, localVars)
		{
			TimerClock.resume();
		},

		async Loader_Event1_Act1(runtime, localVars)
		{
			globalThis.Renderer = {
				endPomodoroTime: null
			};
			
			await runtime.assets.loadScripts("renderer.js");
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
