import { extendObservable, action } from 'mobx'

export default class TodoListModel {
  constructor() {
    extendObservable(this, {
      start: Date.now(),
      current: Date.now(),
      get elapsedTime() {
        return `${this.current - this.start}milliseconds`
      },
      tick: action(() => {
        this.current = Date.now()
      }),
    })
  }
}
