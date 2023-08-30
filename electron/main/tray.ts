import { join } from 'node:path'
import process from 'node:process'
import { Tray as ElectronTray, Menu, nativeImage } from 'electron'
import type { App, BrowserWindow, NativeImage } from 'electron'

export class Tray {
  static instance: Tray
  public app: App
  public win: BrowserWindow
  public tray: ElectronTray | null = null
  private icon: string = join(process.env.VITE_PUBLIC, 'tray', 'tray.png')
  private image: NativeImage = nativeImage.createFromPath(this.icon)
  private contextMenu: Menu = Menu.buildFromTemplate([])

  constructor(app: App, win: BrowserWindow) {
    if (Tray.instance)
      return Tray.instance

    this.app = app
    this.win = win
    Tray.instance = this
  }

  init() {
    this.setTray()
    return this.tray
  }

  setMenu() {
    this.tray?.setContextMenu(this.contextMenu)
  }

  setTray() {
    if (this.tray)
      return
    this.tray = new ElectronTray(this.image)
    this.setMenu()
  }
}
