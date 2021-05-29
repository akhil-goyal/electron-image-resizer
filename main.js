// app maintains the entire lifecycle of our application.
// browserWindow is used to create desktop window.
const { app, BrowserWindow } = require('electron');

const createMainWindow = () => {

    // Desktop Window configuration
    const mainWindow = new BrowserWindow({
        title: 'ShrinkIT',
        width: 500,
        height: 600
    });

}

app.on('ready', createMainWindow);