import { createStore } from "vuex";

interface State {
  notes: string[];
}

export default createStore({
  state: {
    notes: [],
  },
  getters: {
    notes: (state: State) => {
      return state.notes;
    },
  },
  mutations: {
    GET_NOTES(state: State) {
      if (localStorage.getItem("notes")) {
        try {
          state.notes = JSON.parse(localStorage.getItem("notes") as string);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
          console.error(e.message);
        }
      }
    },
    SAVE_NOTES(state: State, val: string[]) {
      state.notes = val;
      localStorage.setItem("notes", JSON.stringify(val));
    },
  },
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getNotes(context: any) {
      context.commit("GET_NOTES");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    saveNotes(context: any, val: string[]) {
      context.commit("SAVE_NOTES", val);
    },
  },
  modules: {},
});
