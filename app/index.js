const path = require('path');
const electron = require('electron');

const { app, BrowserWindow, Tray, Menu, ipcMain  }= electron;

let mainWindow = null;
let tray = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 180,
        width: 320,
        frame: false,
        resizable: false,
        show: false,
        alwaysOnTop: true,
        webPreferences: {
            pageVisibility: true, 
            backgroundThrottling: false,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    mainWindow.loadURL(`file://${__dirname}/www/index.html`);

    mainWindow.on('blur', () => {
        mainWindow.hide();
    })

    const iconPath = path.join(__dirname, 'www' , 'icons', '/icon-32.png');
    tray = new Tray(iconPath);
    
    const menu = Menu.buildFromTemplate([
        {
            label: 'Quit',
            click: () => app.quit()
        }
    ]);

    tray.setToolTip('Pomodoro');
    tray.setContextMenu(menu);

    tray.on('click', (event, bounds) => {
        const { x, y } = bounds;
        const { height, width } =  mainWindow.getBounds();

        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.setBounds({
                x: x - width/2,
                y: y - height,
                height,
                width
            });
            mainWindow.show();
        }
    });

    tray.on('balloon-click', (event) => {
            mainWindow.show();
    });
})

ipcMain.on('end-pomodoro-time', (event) => {
    tray.displayBalloon({
        icon: path.join(__dirname, 'www' , 'icons', '/icon-128.png'),
        iconType: "custom",
        title: "Pomodoro c3",
        content: "Pomodoro Finished"
    });
});