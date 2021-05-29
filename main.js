// app maintains the entire lifecycle of our application.
// browserWindow is used to create desktop window.
const { app, BrowserWindow } = require('electron');

let mainWindow

const createMainWindow = () => {

    // Desktop Window configuration
    mainWindow = new BrowserWindow({
        title: 'ShrinkIT',
        width: 500,
        height: 600,
        icon: './assets/icons/Icon_256x256.png'
    });

    mainWindow.loadFile('./app/index.html');

}

app.on('ready', createMainWindow);