<template>
  <v-container>
    <v-tabs @change="getFullTimetable()" class="tabs" v-model="tab" grow>
      <v-tabs-slider color="primary"></v-tabs-slider>

      <v-tab v-for="division in divisions" :key="division">{{
        division
      }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="division in divisions" :key="division">
        <v-layout wrap>
          <v-flex md3 xs12>
            <v-layout column>
              <v-flex style="font-weight: 700; color: grey" class="headline"
                >{{ mainOptions.college }} - {{ mainOptions.department }} -
                {{ mainOptions.year }} - {{ divisions[tab] }}</v-flex
              >
              <v-flex> <h1>Select number of columns:</h1> </v-flex>
              <v-flex>
                <v-combobox
                  v-model="mondayColumn"
                  :items="numberOptions"
                  prefix="Monday: "
                ></v-combobox>
              </v-flex>
              <v-flex>
                <v-combobox
                  v-model="tuesdayColumn"
                  :items="numberOptions"
                  prefix="Tuesday: "
                ></v-combobox>
              </v-flex>
              <v-flex>
                <v-combobox
                  v-model="wednesdayColumn"
                  :items="numberOptions"
                  prefix="Wednesday: "
                ></v-combobox>
              </v-flex>
              <v-flex>
                <v-combobox
                  v-model="thursdayColumn"
                  :items="numberOptions"
                  prefix="Thursday: "
                ></v-combobox>
              </v-flex>
              <v-flex>
                <v-combobox
                  v-model="fridayColumn"
                  :items="numberOptions"
                  prefix="Friday: "
                ></v-combobox>
              </v-flex>
              <v-flex>
                <v-combobox
                  v-model="saturdayColumn"
                  :items="numberOptions"
                  prefix="Saturday: "
                ></v-combobox>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex md1 xs12>
            <v-divider class="card-divider" inset vertical></v-divider>
          </v-flex>
          <v-flex md8 xs12>
            <div style="font-weight: 700; color: gray" class="headline">
              Timetable
            </div>
            <div>
              <TileComponent />
            </div>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs-items>
    <v-snackbar v-model="errorSnackbar.display" :timeout="5000">
      {{ errorSnackbar.text }}
      <v-btn color="primary" text @click="errorSnackbar.display = false"
        >Close</v-btn
      >
    </v-snackbar>
  </v-container>
</template>

<script>
import InDepthView from "../../components/principal/InDepthView";
import TileComponent from "../TileComponent";
import {
  getTimetable,
  addTimetable,
  getCompleteFacultyTimetable
} from "../../api/API";
import { mapState } from "vuex";

export default {
  data() {
    mondayColumn: 0;
    tuesdayColumn: 0;
    wednesdayColumn: 0;
    thursdayColumn: 0;
    fridayColumn: 0;
    saturdayColumn: 0;
    const numberOptions = ["1", "2", "3", "4", "5", "6", "7"];
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "SaturdayEven",
      "SaturdayOdd"
    ];

    const times = [
      "08:00:00",
      "08:30:00",
      "09:00:00",
      "09:30:00",
      "10:00:00",
      "10:30:00",
      "11:00:00",
      "11:30:00",
      "12:00:00",
      "12:30:00",
      "13:00:00",
      "13:30:00",
      "14:00:00",
      "14:30:00",
      "15:00:00",
      "15:30:00",
      "16:00:00",
      "16:30:00",
      "17:00:00",
      "17:30:00",
      "18:00:00",
      "18:30:00",
      "19:00:00",
      "19:30:00"
    ];

    return {
      select: "Programming",
      items: ["Programming", "Design", "Vue", "Vuetify"],
      times: times,
      days: days,

      errorSnackbar: {
        display: false,
        text: ""
      },

      classRooms: [514, 504, 511],

      startTimeMenu: false,

      endTimeMenu: false,

      startTimeTime: null,
      // startTime: [false, false, false],

      endTimeTime: null,
      // endTime: [false, false, false],

      selectOptions: {
        day: days[0],
        end_time: null,
        start_time: null,
        subject: "Select",
        teacher: "Select",
        sdrn: 0,
        // classroom: "514",
        room: "511",
        batch: "All"
      },

      viewOptions: {
        // department: "",
        // division: "",
        // year: "",
        day: "",
        time: "",
        sdrn: "",
        room: ""
      },

      keyCounter: 0,
      tab: 0,
      text: "Lorem ipsum dolor sit .",
      finalTimetable: []
    };
  },
  computed: {
    ...mapState(["mainOptions"]),
    batches() {
      let ourArray = [
        "All",
        this.divisions[this.tab] + "1",
        this.divisions[this.tab] + "2",
        this.divisions[this.tab] + "3",
        this.divisions[this.tab] + "4"
      ];
      return ourArray;
    },
    ourTimetable: {
      get() {
        if (this.finalTimetable.length == 0) {
          return this.timetable;
        } else {
          return this.finalTimetable;
        }
      },
      set(newValue) {
        this.keyCounter++;
        this.finalTimetable = newValue;
      }
    },
    ourCourse() {
      if (this.faculty.course) {
        return this.faculty.course;
      } else {
        return ["error", "in", "getting", "data"];
      }
    },
    ourFaculty() {
      if (this.faculty.faculty) {
        let abc = [];
        this.faculty.faculty.forEach(element => {
          abc.push(element.name);
        });
        return abc;
      } else {
        return ["error", "in", "getting", "data"];
      }
    },
    divisions() {
      if (this.mainOptions.year === "FE") {
        return [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M"
        ];
      } else {
        if (this.mainOptions.department === "ETRX") {
          return ["A", "B", "C", "D"];
        } else {
          return ["A", "B", "C"];
        }
      }
    }
  },
  props: ["timetable", "faculty"],
  components: {
    InDepthView,
    TileComponent
  },
  methods: {
    addCard() {
      // this.noOfCards++;
      addTimetable(
        {
          department: this.mainOptions.department,
          year: this.mainOptions.year,
          ...this.selectOptions
        },
        this.divisions[this.tab],
        this.mainOptions.college
      ).then(res => {
        console.log(res);
        if (res.error) {
          // show error
          this.errorSnackbar.display = true;
          this.errorSnackbar.text = res.error;
        }
      });

      this.getFullTimetable();
    },
    getOurTimetable() {
      this.ourTimetable = [];
      getTimetable(
        this.mainOptions.college,
        this.mainOptions.department,
        this.mainOptions.year,
        this.divisions[this.tab]
      ).then(res => {
        this.ourTimetable = res;
        console.log(res);
      });
    },
    getFullTimetable() {
      const vm = this;
      this.ourTimetable = [];
      getCompleteFacultyTimetable("RAIT", {
        ...this.viewOptions,
        department: vm.mainOptions.department,
        year: vm.mainOptions.year,
        division: this.divisions[this.tab]
      }).then(res => {
        this.ourTimetable = res;
        console.log(res);
      });
    },
    deleteRecord(srno) {
      console.log("deleted something " + srno);

      this.ourTimetable = [];

      // this.getOurTimetable();
      this.getFullTimetable();
    }
  }
};
</script>

<style lang="stylus" scoped>
.timetable-card {
  margin-bottom: 2rem;
  margin-right: 2rem;
}

.tabs {
  margin-bottom: 2rem;
}

.card-divider {
  height: 100%;
  margin: 0 75%;
  background: grey;
}

.subject_container {
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
}

.delete_button {
  position: absolute;
  right: 0;
}
</style>
