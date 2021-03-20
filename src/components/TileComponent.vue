<template>
  <v-card :style="getStyle" tile class="mx-auto" max-width="150">
    Hello
  </v-card>
</template>

<script>
export default {
  computed: {
    getStyle() {
      const style = {
        color: "white",
        backgroundColor: this.getRandomColor()
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
