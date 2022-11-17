<template>
  <div id="word-cloud" ref="wordCloud">
  </div>
</template>

<script>
import json from '@/json/wordCloud_1.json'
import { wordCloudCanvasGenerator } from '@/utils'

export default {
  name: 'WordCloud',
  data () {
    return {
      chartData: json.items.map((item) => {
        return {
          id: item.values[0].value,
          x: item.values[2].value,
          value: item.values[3].value,
          category: item.type
        }
      }),
      width: 0,
      height: 0,
      currentRenderingChart: {}
    }
  },
  created () {
    window.addEventListener('resize', this.windowResizeHandler)
  },
  destroyed () {
    window.removeEventListener('resize', this.windowResizeHandler)
  },
  mounted () {
    this.currentRenderingChart = wordCloudCanvasGenerator(this.chartData, window.innerWidth - 20, window.innerHeight - 290)
  },
  methods: {
    windowResizeHandler (e) {
      this.currentRenderingChart.destroy()
      this.currentRenderingChart = wordCloudCanvasGenerator(this.chartData, window.innerWidth - 20, window.innerHeight - 290)
    // your code for handling resize...
    }
  }
}
</script>
