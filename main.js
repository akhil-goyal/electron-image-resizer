// app maintains the entire lifecycle of our application.
// browserWindow is used to create desktop window.
const { app, BrowserWindow, Menu, globalShortcut } = require('electron');

// Setting the environment.
process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;

const createMainWindow = () => {

    // Desktop Window configuration
    mainWindow = new BrowserWindow({
        title: 'ShrinkIT',
        width: 500,
        height: 600,
        icon: './assets/icons/Icon_256x256.png',
        resizable: isDev ? true : false
    });

    mainWindow.loadFile('./app/index.html');

}

app.on('ready', () => {
    createMainWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);


    // GLOBAL SHORTCUTS
    globalShortcut.register('CmdOrCtrl+R', () => {
        mainWindow.reload();
    });

    globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () => {
        mainWindow.toggleDevTools();
    });

    mainWindow.on('ready', () => mainWindow = null);
});

const menu = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
        role: 'fileMenu'
        // label: 'File',
        // submenu: [
        //     {
        //         label: 'Quit',
        //         // accelerator: isMac ? 'Command+W' : 'Ctrl+W',
        //         accelerator: 'CmdOrCtrl+W',
        //         click: () => app.quit()
        //     }
        // ]
    },
    ...(isDev ? [
        {
            label: 'Developer',
            submenu: [
                {
                    role: 'reload',
                    role: 'forcereload',
                    type: 'separator',
                    role: 'toggledevtools',
                }
            ]
        }
    ] : [])
];

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});

app.allowRendererProcessReuse = true;