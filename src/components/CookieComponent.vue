<template>
  <div class="cookieParent">
    <div class="cookieHitbox" @mousedown="state.addCookies(1)"/>
    <img alt="" src="../assets/logo.png" class="cookieImage"/>
  </div>
</template>

<script lang="ts">
import state from "@/State";
import {ref} from "vue";

export default {
  name: "CookieComponent",
  setup() {
    const clicked = ref(false);

    return {
      state,
      clicked
    }
  }
}
</script>

<style lang="scss" scoped>
.cookieParent {
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  height: 500px;
  position: relative;

  .cookieHitbox, .cookieImage {
    position: absolute;
    width: 500px;
    height: 500px;
    display: block;
  }

  .cookieHitbox {
    z-index: 1;
    border-radius: 50%;
  }

  .cookieImage {
    transform: scale(1.07);
    transition: transform 200ms cubic-bezier(.41, 2.99, .42, .29);
  }

  .cookieHitbox:not(:active):hover + .cookieImage {
    transform: scale(1.1);
  }
}
</style>