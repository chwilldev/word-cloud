<template>
  <div>
    <v-tabs center-active dark>
      <v-tab v-for="(category, index) in categories" :key="index" @click="categoryChangeHandler(category)">
        {{category}}
      </v-tab>
    </v-tabs>
    <div id="word-cloud" ref="wordCloud">
    </div>
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
          category: item.values[1].value,
          x: item.values[2].value,
          value: item.values[3].value
        }
      }),
      categories: [
        'all',
        ...new Set(json.items.map((item) => item.values[1].value))
      ].map((category) => category),
      currentCategory: 'all',
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
    this.width = window.innerWidth - 20
    this.height = window.innerHeight - 330
    this.wordCloudGenerator()
  },
  methods: {
    windowResizeHandler (e) {
      this.width = window.innerWidth - 20
      this.height = window.innerHeight - 330
      this.wordCloudGenerator()
    // your code for handling resize...
    },
    categoryChangeHandler (selectedCategory) {
      this.currentCategory = selectedCategory
      this.wordCloudGenerator()
    },
    wordCloudGenerator () {
      if (Object.keys(this.currentRenderingChart).length) this.currentRenderingChart.destroy()
      this.currentRenderingChart = wordCloudCanvasGenerator(this.chartData, this.width, this.height, this.currentCategory)
    }
  }
}
</script>
