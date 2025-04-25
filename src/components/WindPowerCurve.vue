<template>
  <LayoutPanel title="风速-功率时序曲线" icon="fa-fan">
    <div class="chart-container">
      <div ref="container" class="echarts-container"></div>
    </div>
  </LayoutPanel>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useEcharts } from '@/hooks/useEcharts'
import { LayoutPanel } from '@/layout'

interface DataPoint {
  time: string
  power: number
  windSpeed: number
}

const { container, init, setOption, resize } = useEcharts()
const initStatus = ref(false)

// 生成模拟数据
const generateMockData = (): DataPoint[] => {
  const data: DataPoint[] = []
  
  // 基础风速模式：早晚较大，中午较小
  const baseWindPattern = [
    8, 7, 6, 5, 4, 3, 4, 5, 6, 7, 8, 9, 8 // 增加24点数据
  ]
  
  // 为每个时间点生成数据（0-24点，每2小时）
  for (let hour = 0; hour <= 24; hour += 2) {
    // 获取基础风速并添加随机波动
    const baseWind = baseWindPattern[hour / 2]
    const windSpeed = Math.max(0, baseWind + (Math.random() - 0.5) * 2)
    
    // 模拟功率计算
    const efficiency = 0.4
    const power = Math.round(Math.pow(windSpeed, 3) * efficiency * 100)
    
    // 修改时间格式为"0点"、"2点"..."24点"
    const timeStr = hour === 24 ? '24点' : `${hour}点`
    
    data.push({
      time: timeStr,
      power: power,
      windSpeed: Number(windSpeed.toFixed(1))
    })
  }
  
  return data
}

// 生成图表配置
const generateOptions = () => {
  const mockData = generateMockData()
  
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      formatter: (params: any[]) => {
        const time = params[0].axisValue
        const powerItem = params.find(item => item.seriesName === '功率')
        const windItem = params.find(item => item.seriesName === '风速')
        return `时间：${time}<br/>
                功率：${powerItem?.value ?? '-'} kW<br/>
                风速：${windItem?.value ?? '-'} m/s`
      }
    },
    legend: {
      data: [
        {
          name: '功率',
          textStyle: {
            color: '#5470C6' // 与左侧功率坐标轴颜色一致
          }
        },
        {
          name: '风速',
          textStyle: {
            color: '#91CC75' // 与右侧风速坐标轴颜色一致
          }
        }
      ],
      right: '10%',
      top: '3%',
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: mockData.map(item => item.time),
      axisLabel: {
        formatter: '{value}',
        interval: 1
      },
      axisLine: { show: true },
      axisTick: { show: true },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '功率(kW)',
        position: 'left',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#5470C6'
          }
        },
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      {
        type: 'value',
        name: '风速(m/s)',
        position: 'right',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#91CC75'
          }
        },
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '功率',
        type: 'line',
        yAxisIndex: 0,
        data: mockData.map(item => item.power),
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#5470C6'
        },
        smooth: true
      },
      {
        name: '风速',
        type: 'line',
        yAxisIndex: 1,
        data: mockData.map(item => item.windSpeed),
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#91CC75'
        },
        smooth: true
      }
    ]
  }
}

// 更新图表数据
const updateChart = () => {
  if (initStatus.value) {
    try {
      setOption(generateOptions())
    } catch (error) {
      console.error('图表更新失败:', error)
    }
  }
}

// 生命周期管理
let updateTimer: number | null = null

onMounted(async () => {
  // 初始化图表
  if (init()) {
    initStatus.value = true
    setOption(generateOptions())
    // 设置定时更新
    updateTimer = window.setInterval(updateChart, 60000)
  }
})

onUnmounted(() => {
  // 清理定时器
  if (updateTimer !== null) {
    clearInterval(updateTimer)
    updateTimer = null
  }
})
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 300px;
  padding: 12px;
  .echarts-container {
    position: absolute;
    top: 12px;
    right: 12px;
    bottom: 12px;
    left: 12px;
    width: calc(100% - 24px);
    height: calc(100% - 24px);
  }
}
:deep(.layout-panel-content) {
  height: 100%;
  overflow: hidden;
}
</style>