async function webApiNotification() {

	const icon = await g_runtime.assets.getProjectFileUrl("icon-notification.png");
	const title = "Pomodoro c3";

	const options = {
		body: "Pomodoro Finished",
		icon: icon
	}

	if (!("Notification" in globalThis)) {
    	alert("This browser does not support desktop notification");
  	} else if (Notification.permission === "granted") {
		newNotification(title, options);
	} else if (Notification.permission !== "denied") {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
        	newNotification(title, options);
      }
	}
}

function newNotification(title, options) {
	const notification = new Notification(title, options);
	try {
		const { ipcRenderer } = require('electron');
		notification.onclick = (event) => {
			event.preventDefault();
			ipcRenderer.send("show-pomodoro-clock", "show");
		}
	} catch (error) {
// 		console.error(error);
	}
}

Renderer.endPomodoroTime = webApiNotification;

// try {
// 	const { ipcRenderer } = require('electron');
  	
// 	Renderer.endPomodoroTime = () => {
// 		ipcRenderer.send("end-pomodoro-time", "title");
// 	}
	
// } catch (error) {
//   	console.error(error);
	
// 	Renderer.endPomodoroTime = () => {
// 		console.log("endPomodoroTime");
// 	}
// }
