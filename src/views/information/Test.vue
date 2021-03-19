<template>
  <div class="about">
    <h3>Test {{ region}} {{val}}</h3>
  </div>
</template>

<script>

export default {
  name: 'About',
  components: {
  },
    "props": ["region","val"],

}
</script>
