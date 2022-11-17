import DataSet from '@antv/data-set'
import { Chart, registerShape, Util } from '@antv/g2'

function getTextAttrs (cfg) {
  return {
    ...cfg.defaultStyle,
    ...cfg.style,
    fontSize: cfg.data.size,
    text: cfg.data.text,
    textAlign: 'center',
    fontFamily: cfg.data.font,
    fill: cfg.color || cfg.defaultStyle.stroke,
    textBaseline: 'Alphabetic'
  }
}

registerShape('point', 'cloud', {
  draw (cfg, container) {
    const attrs = getTextAttrs(cfg)
    const textShape = container.addShape('text', {
      attrs: {
        ...attrs,
        x: cfg.x,
        y: cfg.y
      }
    })
    if (cfg.data.rotate) {
      Util.rotate(textShape, cfg.data.rotate * Math.PI / 180)
    }
    return textShape
  }
})

export const wordCloudCanvasGenerator = (data, width, height) => {
  const dv = new DataSet.View().source(data)
  const range = dv.range('value')
  const min = range[0]
  const max = range[1]
  dv.transform({
    type: 'tag-cloud',
    fields: ['x', 'value'],
    size: [width, height],
    font: 'Verdana',
    padding: 0,
    timeInterval: 5000, // max execute time
    rotate () {
      return 0
    },
    fontSize (d) {
      if (d.value) {
        return ((d.value - min) / (max - min)) * (80 - 24) + 24
      }
      return 0
    }
  })
  const chart = new Chart({
    container: 'word-cloud',
    autoFit: false,
    width: width,
    height: height,
    padding: 0
  })
  chart.data(dv.rows)
  chart.scale({
    x: { nice: false },
    y: { nice: false }
  })
  chart.legend(false)
  chart.axis(false)
  chart.tooltip({
    showTitle: false,
    showMarkers: false
  })
  chart.coordinate().reflect()
  chart.point()
    .position('x*y')
    .color('x', ['#025DF4', '#DB6BCF', '#2498D1', '#BBBDE6', '#4045B2', '#21A97A', '#FF745A', '#007E99', '#FFA8A8', '#2391FF', '#025DF4', '#DB6BCF', '#2498D1', '#BBBDE6', '#4045B2', '#21A97A', '#FF745A', '#007E99', '#FFA8A8', '#2391FF', '#FFC328', '#A0DC2C', '#946DFF', '#626681', '#EB4185', '#CD8150', '#36BCCB', '#327039', '#803488', '#83BC99'])
    .shape('cloud')
    .tooltip('value*category')
  chart.interaction('element-active')
  chart.render()
  return chart
}
