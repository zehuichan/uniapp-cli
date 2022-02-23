<template>
  <canvas
    type="2d"
    class="f2-canvas"
    :canvas-id="canvasId"
    :id="canvasId"
    @init="init"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
  </canvas>
</template>

<script>
import F2 from '@antv/f2'

function wrapEvent(e) {
  if (!e) return
  if (!e.preventDefault) {
    e.preventDefault = function () {
    }
  }
  return e
}

export default {
  name: 'wx-f2',
  props: {
    canvasId: {
      type: String,
      default: 'f2-canvas'
    },
    init: Function,
    data: Array,
    width: {
      type: [String, Number],
      default: 400
    },
    height: {
      type: [String, Number],
      default: 260
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    data(n) {
      this.chart.changeData(n)
    }
  },
  onReady() {
    this.initChart()
  },
  methods: {
    initChart() {
      const context = uni.createCanvasContext(this.canvasId)
      const pixelRatio = wx.getSystemInfoSync().pixelRatio
      const chart = this.init(F2, {
        context: context,
        width: this.width,
        height: this.height,
        pixelRatio: pixelRatio
      })

      if (chart) {
        this.chart = chart
        this.canvasEl = chart.get('el')
      }
    },
    touchStart(e) {
      const canvasEl = this.canvasEl
      if (!canvasEl) {
        return
      }
      canvasEl.dispatchEvent('touchstart', wrapEvent(e))
    },
    touchMove(e) {
      const canvasEl = this.canvasEl
      if (!canvasEl) {
        return
      }
      canvasEl.dispatchEvent('touchmove', wrapEvent(e))
    },
    touchEnd(e) {
      const canvasEl = this.canvasEl
      if (!canvasEl) {
        return
      }
      canvasEl.dispatchEvent('touchend', wrapEvent(e))
    }
  }
}
</script>

<style>
.f2-canvas {
  width: 100%;
  height: 100%;
}
</style>