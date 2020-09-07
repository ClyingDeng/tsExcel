<template>
  <div class="down">
    <button>
      <slot>
        <a href="/resource/84template.xlsx">下载模板</a>
      </slot>
    </button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Download extends Vue {}
</script>
