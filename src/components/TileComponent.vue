<template>
  <v-card
    tabindex="-1"
    @blur="storeData"
    :style="getStyle"
    tile
    class="mx-auto"
    max-width="150"
  >
    <v-select
      v-model="facultyName"
      :items="faculty.faculty"
      label="Faculty"
      dense
      light
    >
    </v-select>
    <v-select
      v-model="classroomNumber"
      :items="classroom"
      label="classroom"
      dense
      light
    >
    </v-select>
    <v-select
      v-model="courseName"
      :items="faculty.course"
      label="course"
      dense
      light
    >
    </v-select>
  </v-card>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      classroom: [501, 502, 503],
      facultyName: "",
      classroomNumber: "",
      courseName: ""
    };
  },
  props: ["faculty", "day", "id"],
  computed: {
    getStyle() {
      const style = {
        backgroundColor: this.getRandomColor(),
        padding: "5px",
        borderRadius: "4px",
        color: "white"
      };
      return style;
    }
  },
  methods: {
    getRandomColor() {
      var letters = "0123456789ABCDEF".split("");
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    storeData() {
      const info = {
        id: this.id,
        day: this.day,
        faculty: this.facultyName,
        class: this.classroomNumber,
        course: this.courseName
      };
      store.commit("updateData", info);
    }
  }
};
</script>

<style scoped>
.v-select .v-text-field input {
  color: white !important;
}
</style>
