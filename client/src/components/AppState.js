import { makeObservable, observable, action } from "mobx";

class AppState {
  isBadge = false;

  constructor() {
    makeObservable(this, {
      isBadge: observable,
      toggleBadge: action,
    });
  }

  toggleBadge() {
    this.isBadge = !this.isBadge;
  }
}

export default new AppState();