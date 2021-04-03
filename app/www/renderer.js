// const { ipcRenderer } = require('electron');

// Renderer.endPomodoroTime = () => {
// 	ipcRenderer.send("end-pomodoro-time", "title");
// }

try {
	const { ipcRenderer } = require('electron');
  	
	Renderer.endPomodoroTime = () => {
		ipcRenderer.send("end-pomodoro-time", "title");
	}
	
} catch (error) {
  	console.error(error);
	
	Renderer.endPomodoroTime = () => {
		console.log("endPomodoroTime");
	}
}
