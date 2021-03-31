import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mainOptions: {
      university: "D. Y. Patil University",
      college: "RAIT",
      department: "",
      year: "FE"
    },
    mondayTable: [],
    tuesdayTable: [],
    wednesdayTable: [],
    thursdayTable: [],
    fridayTable: [],
    saturdayTable: []
  },
  mutations: {
    changeMainOptions(state, payload) {
      switch (payload.type) {
        case "university": {
          state.mainOptions.university = payload.option;
          break;
        }
        case "college": {
          state.mainOptions.college = payload.option;
          break;
        }
        case "department": {
          state.mainOptions.department = payload.option;
          // FE hack
          if (payload.option === "FE") {
            state.mainOptions.year = "FE";
          }
          break;
        }
        case "year": {
          state.mainOptions.year = payload.option;
          break;
        }
        default: {
          break;
        }
      }
    },
    updateData(state, payload) {
      console.log(payload);
      switch (payload.day) {
        case "Monday":
          state.mondayTable = state.mondayTable.filter(function(item) {
            return item.id !== payload.id;
          });
          state.mondayTable.push({
            id: payload.id,
            faculty: payload.faculty,
            class: payload.class,
            course: payload.course
          });
          state.mondayTable.sort((a, b) => (a.id > b.id ? 1 : -1));
          break;
        case "Tuesday":
          state.tuesdayTable = state.tuesdayTable.filter(function(item) {
            return item.id !== payload.id;
          });
          state.tuesdayTable.push({
            faculty: payload.faculty,
            class: payload.class,
            course: payload.course
          });
          state.tuesdayTable.sort((a, b) => (a.id > b.id ? 1 : -1));
          break;
        case "Wednesday":
          state.wednesdayTable = state.wednesdayTable.filter(function(item) {
            return item.id !== payload.id;
          });
          state.wednesdayTable.push({
            faculty: payload.faculty,
            class: payload.class,
            course: payload.course
          });
          state.wednesdayTable.sort((a, b) => (a.id > b.id ? 1 : -1));
          break;
        case "Thursday":
          state.thursdayTable = state.thursdayTable.filter(function(item) {
            return item.id !== payload.id;
          });
          state.thursdayTable.push({
            faculty: payload.faculty,
            class: payload.class,
            course: payload.course
          });
          state.thursdayTable.sort((a, b) => (a.id > b.id ? 1 : -1));
          break;
        case "Friday":
          state.fridayTable = state.fridayTable.filter(function(item) {
            return item.id !== payload.id;
          });
          state.fridayTable.push({
            faculty: payload.faculty,
            class: payload.class,
            course: payload.course
          });
          state.fridayTable.sort((a, b) => (a.id > b.id ? 1 : -1));
          break;
        case "Saturday":
          state.saturdayTable = state.saturdayTable.filter(function(item) {
            return item.id !== payload.id;
          });
          state.saturdayTable.push({
            faculty: payload.faculty,
            class: payload.class,
            course: payload.course
          });
          state.saturdayTable.sort((a, b) => (a.id > b.id ? 1 : -1));
          break;
      }
    }
  },
  actions: {}
});
