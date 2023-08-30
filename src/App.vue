<script setup lang="ts">
import { ref } from 'vue'
import { ipcRenderer } from 'electron'

const interval = ref(0)
const sentence = ref('')

getSentence()

function start() {
  ipcRenderer.send('set-timer', interval.value)
}

function stop() {
  ipcRenderer.send('stop-timer')
}

function getSentence() {
  fetch('https://v1.hitokoto.cn?max_length=20')
    .then(response => response.json())
    .then((data) => {
      sentence.value = data.hitokoto
    })
    .catch(console.error)
}
</script>

<template>
  <el-alert class="remind-tips" size="small" title="默认 1 小时提醒一次" type="info" show-icon :closable="false" />

  <el-space wrap>
    <el-input-number
      v-model="interval"
      :precision="1"
      :step="0.1"
      :max="2"
      :controls="false"
    />

    <el-button-group>
      <el-button type="primary" @click="start">
        开始
      </el-button>
      <el-button type="danger" @click="stop">
        清除
      </el-button>
    </el-button-group>
  </el-space>

  <div class="bottom">
    {{ sentence }}
  </div>
</template>

<style>
.remind-tips {
  height: 30px;
  margin-bottom: 20px;
}
.bottom {
  margin-top: 20px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: rgba(60, 60, 60, .7);
}
</style>
