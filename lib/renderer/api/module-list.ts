const v8Util = process.electronBinding('v8_util')

const enableRemoteModule = v8Util.getHiddenValue<boolean>(global, 'enableRemoteModule')

// Renderer side modules, please sort alphabetically.
export const rendererModuleList: ElectronInternal.ModuleEntry[] = [
  { name: 'crashReporter', loader: () => require('./crash-reporter') },
  { name: 'ipcRenderer', loader: () => require('./ipc-renderer') },
  { name: 'webFrame', loader: () => require('./web-frame') }
]

if (BUILDFLAG(ENABLE_DESKTOP_CAPTURER)) {
  rendererModuleList.push({ name: 'desktopCapturer', loader: () => require('./desktop-capturer') })
}

if (BUILDFLAG(ENABLE_REMOTE_MODULE) && enableRemoteModule) {
  rendererModuleList.push({ name: 'remote', loader: () => require('./remote') })
}
