import { Notification, ipcMain } from 'electron'

class Remind {
  static instance: Remind
  static hour: number = 60 * 60 * 1000
  public timer: NodeJS.Timeout | null = null
  public defaultInterval: number = 1
  public interval: number
  constructor() {
    if (Remind.instance)
      return Remind.instance

    Remind.instance = this
    this.initIpc()
  }

  initIpc() {
    ipcMain.on('set-timer', (event, interval) => {
      if (!this.isWeekday())
        return this.sendNotification('今天是周末', '不用提醒了')

      this.interval = interval || this.defaultInterval
      this.setTimer(this.interval)
      this.sendNotification('设置成功', `每${this.interval}小时提醒一次`)
    })
    ipcMain.on('stop-timer', (event) => {
      this.stopTimer()
      this.sendNotification('提醒', '已成功停止清除')
    })
  }

  setTimer(interval: number) {
    if (this.timer)
      clearInterval(this.timer)

    this.timer = setInterval(() => {
      if (this.isWeekday())
        this.sendNotification('别肝了！', '摸一会儿鱼吧~')
    }, interval * Remind.hour)
  }

  stopTimer() {
    if (this.timer)
      clearInterval(this.timer)
  }

  sendNotification(title: string, body: string) {
    const notification = new Notification({
      title,
      body,
    })
    notification.show()
  }

  isWeekday() {
    const day = new Date().getDay()
    return day !== 0 && day !== 6
  }
}

export default Remind
