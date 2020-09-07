<template>
  <div id="app">
    <DownLoad />
    <UpLoad />
    <Export />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UpLoad from './components/UpLoad.vue';
import DownLoad from './components/DownLoad.vue';
import Export from './components/Export.vue';

@Component({
  components: {
    UpLoad,
    DownLoad,
    Export
  }
})
export default class App extends Vue {
  // private mounted() {}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  button {
    margin: 20px;
    border-radius: 4px;
    font-weight: 500;
    letter-spacing: 0.09em;
    outline: none;
    cursor: pointer;
    min-width: 64px;
    height: 36px;
    padding: 0 16px;
    font-size: 16px;
    border: 1px solid #b3d8ff;
    background: #dbeafa;
    color: #409eff;
    &:hover,
    &:focus {
      border: 1px solid #69abec;
      background: #69abec;
      color: #ffffff;
    }
    a {
      color: #409eff;
      text-decoration: none;
      &:hover,
      &:focus {
        color: #ffffff;
      }
    }
  }
}
</style>
