export class TableSelectionState {
  public allSelected: boolean;
  public hasSelected: boolean;
  public state: {[key: string]: boolean };

  constructor() {
    this.allSelected = false;
    this.hasSelected = false;
    this.state = {};
  }

  public resetState(idList: string[]) {
    for (const id of idList) {
      this.state[id] = false;
    }
  }

  public updateFlags() {
    this.allSelected = Object.keys(this.state)
      .map(key => this.state[key])
      .every(selected => selected);
    this.hasSelected = Object.keys(this.state)
      .map(key => this.state[key])
      .some(selected => selected);
  }

  public toggleAll(selected: boolean) {
    for (const id of Object.keys(this.state)) {
      this.state[id] = selected;
    }

    this.updateFlags();
  }

  public toggle(id: string, selected: boolean) {
    this.state[id] = selected;
    this.updateFlags();
  }

  public getSelected() {
    return Object.keys(this.state)
      .filter(id => this.state[id]);
  }
}
