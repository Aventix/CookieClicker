<template>
  <div style="font-size: x-large">Deine gesammelten Kekse: {{ Math.round(state.cookieCount.value) }}</div>
  <div style="font-size: x-large">Cookies pro Sekunde: {{ Math.round(((state.calculateClickPerSecond() + Number.EPSILON) * 100) / 100) }}</div>
  <button
      :disabled="!state.canBuy(AutoClicker)"
      @click="() => state.buy(AutoClicker)">
    AutoClicker ({{ state.calculatePrice(AutoClicker) }})
  </button>
  <button
      :disabled="!state.canBuy(GrandMa)"
      @click="() => state.buy(GrandMa)">
    GrandMa ({{ state.calculatePrice(GrandMa) }})
  </button>
  <button
      style="margin-bottom: 100px"
      :disabled="!state.canBuy(Factory)"
      @click="() => state.buy(Factory)">
    Factory ({{ state.calculatePrice(Factory) }})
  </button>
  <CookieComponent/>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, ref} from 'vue';
import state from "@/State";
import CookieComponent from "@/components/CookieComponent.vue";
import {AutoClicker, GrandMa, Factory} from "@/State";

export default defineComponent({
  name: 'App',
  components: {
    CookieComponent
  },
  setup() {
    console.log(state);
    let interval = 0;

    onMounted(() => {
      interval = setInterval(() => {
        state.addCookies(state.calculateClickPerSecond() * 0.1);
      }, 100, 100);
    });

    onUnmounted(() => {
      clearInterval(interval);
    })

    return {
      state: state,
      GrandMa,
      Factory,
      AutoClicker
    }
  },
});
</script>

<style lang="scss">

body {
  background-color: #7FD6FF;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
