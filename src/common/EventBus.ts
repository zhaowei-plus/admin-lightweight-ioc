class EventBus {
  listeners: object

  constructor() {
   this.listeners = {}
  }

  emit (type, ...args) {
    const targetListeners = this.listeners[type]
    if (Array.isArray(targetListeners)) {
      targetListeners.forEach(listener => {
        listener(args)
      })
    } else {
      targetListeners(args)
    }
  }

  on (type, listener) {
    const targetListener = this.listeners[type]
    if (!targetListener) {
      this.listeners[type] = [listener]
    } else {
      this.listeners[type].push(listener)
    }
    return listener
  }

  off (type, listener?) {
    if (listener) {
      this.listeners[type] = this.listeners[type].filter(s => s !== listener)
    } else {
      this.listeners[type] = []
    }
  }

  clear () {
    this.listeners = {}
  }
}

const eventBus = new EventBus()

export default eventBus
