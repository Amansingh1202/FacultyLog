<template>
  <v-card :style="getStyle" tile class="mx-auto" max-width="150">
    <v-select
      style="color:white"
      :items="faculty.faculty"
      label="Faculty"
      dense
    >
    </v-select>
    <v-select style="color:white" :items="classroom" label="classroom" dense>
    </v-select>
    <v-select style="color:white" :items="faculty.course" label="course" dense>
    </v-select>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      classroom: [501, 502, 503]
    };
  },
  props: ["faculty"],
  computed: {
    getStyle() {
      const style = {
        backgroundColor: this.getRandomColor(),
        padding: "5px",
        borderRadius: "4px"
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
    }
  }
};
</script>

<style scoped>
.v-select {
  color: white !important;
}
</style>
