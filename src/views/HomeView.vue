<template>
  <div class="home">
    <Notes />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Notes from "@/components/Notes.vue"; // @ is an alias to /src

@Options({
  components: {
    Notes,
  },
})
export default class HomeView extends Vue {}
</script>

<style lang="scss">
.home {
  flex: 1;
  overflow: hidden;
}
</style>
