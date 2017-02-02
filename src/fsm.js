class FSM {

    constructor(config) {
      if(!config) {
        throw new Error();
      }

      this.initial = config.initial;
      this.states = config.states;
      this.initialConst = this.initial;
      this.memory = [];
      this.garbage = [];
    }


    getState() {
      return this.initial;
    }

    changeState(state) {
      this.garbage = [];
      for (let states in this.states) {
        if (states === state) {

          this.memory.push(this.initial);

          this.initial = state;
          return;
        }
      }
      throw new Error();
    }

    trigger(event) {
      this.garbage = [];
      if (this.states[this.initial].transitions[event]) {

        for (let state in this.states) {
          let temp = this.states[state].transitions;
          for (let events in temp) {
            if (events == event) {

              this.memory.push(this.initial);

              this.initial = temp[events];
              return;
            }
          }
        }

      } else {
        throw new Error();
      }

    }

    reset() {
      this.initial = this.initialConst;
    }

    getStates(event) {
      let mass = [];
      if (!arguments[0]) {
        for (let state in this.states) {
          mass.push(state);
        }
      }

      for (let state in this.states) {
        let temp = this.states[state].transitions;
        for (let events in temp) {
          if (events == event) {
            mass.push(state);
          }
        }
      }

      return mass;
    }

    undo() {

      if (this.memory.length > 0) {
        let deleted = this.memory.pop();
        this.garbage.push(this.initial);
        this.initial = deleted;
        return true;
      }

      return false;
    }

    redo() {

      if (this.garbage.length) {
        this.initial = this.garbage.pop();
        return true;
      }

      return false;
    }


    clearHistory() {
      this.memory = [];
      this.garbage = [];

    }
}

module.exports = FSM;
