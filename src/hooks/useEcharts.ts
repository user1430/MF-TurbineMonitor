import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import * as echarts from 'echarts/core'
import { isElement } from 'lodash-es'
import { BarChart, LineChart } from 'echarts/charts'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  LabelLayout,
  CanvasRenderer,
  LineChart,
])

/**
 * 用法如下
 * - 函数执行后导出`container`、`setOption`、`resize`方法
 * - 将`container`通过`ref`绑定到模板容器中
 * - 获取数据后通过`setOption`设置图表数据
 * - 如果需要重新渲染图表，调用`resize`方法
 */
export function useEcharts() {
  let cache = {}
  const container = ref<HTMLElement>()
  const chart = shallowRef<echarts.ECharts>()

  const init = (theme = 'light'): boolean => {
    try {
      if (!container.value) {
        console.warn('容器未绑定')
        return false
      }
      if (chart.value) chart.value.dispose()
      chart.value = echarts.init(container.value, theme)
      return true
    } catch (e) {
      console.error('ECharts初始化失败:', e)
      return false
    }
  }

  const resize = () => chart.value?.resize()
  const clear = () => chart.value?.clear()
  
  const setOption = (option: echarts.ECOption) => {
    cache = option
    if (!chart.value && !init()) return
    chart.value?.setOption(option)
  }

  // 生命周期管理
  const setup = () => {
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      chart.value?.dispose()
    }
  }

  onMounted(setup)
  onUnmounted(setup)

  return { 
    container, 
    chart, 
    setOption, 
    resize, 
    clear, 
    echarts,
    init
  }
}

export default useEcharts