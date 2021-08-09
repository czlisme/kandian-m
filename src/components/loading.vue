<template>
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped lang='less'>
.loading {
  width: 62px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  top: 45%;
  margin: 0 auto;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

.loading span {
  width: 25px;
  height: 25px;
}

.loading span:nth-child(1) {
  background-color: #e5efc1;
  border-radius: 50% 50% 0 50%;
}
.loading span:nth-child(2) {
  background-color: #a2d5ab;
  border-radius: 50% 50% 50% 0;
}
.loading span:nth-child(3) {
  background-color: #39aea9;
  border-radius: 50% 0 50% 50%;
}
.loading span:nth-child(4) {
  background-color: #557b83;
  border-radius: 0 50% 50% 50%;
}
</style>
