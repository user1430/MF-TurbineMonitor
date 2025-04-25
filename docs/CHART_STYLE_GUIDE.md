# 图表组件设计规范

## 1. 标题栏规范
```markdown
- **位置**：顶部固定高度40px
- **字体**：DincorosBlack, 14px
- **颜色**：
  - 文字: #00fea9
  - 背景: linear-gradient(90deg, rgba(0,30,60,0.5), rgba(0,254,169,0.2))
- **图标**：FontAwesome图标，12px
- **内边距**：8px 12px
```

## 2. 图表容器标准
```markdown
- **尺寸**：calc(100% - 20px)
- **边距**：10px
- **背景**：rgba(0,30,60,0.3)
- **圆角**：底部4px圆角
- **最小高度**：380px
```

## 3. 配色方案
```javascript
// 标准渐变色
const gradients = {
  green: new echarts.graphic.LinearGradient(0,0,0,1,[
    {offset:0, color:'rgba(0,254,169,1)'},
    {offset:1, color:'rgba(0,254,169,0.1)'}
  ]),
  blue: new echarts.graphic.LinearGradient(0,0,0,1,[
    {offset:0, color:'rgba(87,153,214,1)'}, 
    {offset:1, color:'rgba(87,153,214,0.1)'}
  ])
}
```

## 4. 通用ECharts配置
```javascript
// 基础配置
{
  tooltip: {
    backgroundColor: '#000',
    borderColor: '#333',
    textStyle: { color: '#fff' }
  },
  legend: {
    textStyle: { color: '#fff' },
    right: 0
  },
  grid: {
    left: '4%',
    right: '4%',
    bottom: '0%',
    top: '20%',
    containLabel: true
  },
  xAxis: {
    axisLabel: { color: '#fff', margin: 10 },
    axisLine: { show: false },
    axisTick: { show: false }
  },
  yAxis: {
    axisLabel: { color: '#fff' },
    splitLine: { 
      lineStyle: { 
        color: '#c8c8c830',
        type: 'dashed' 
      }
    }
  }
}
```

## Version Log
- v1.1 (2023-11-20)
  - 新增双Y轴图表规范
  - 添加数据模拟标准
  - 调整容器边距参数

## 5. 最佳实践
1. **使用LayoutPanel**作为容器组件
2. **SCSS**预处理样式
3. **响应式处理**：
```javascript
const resizeChart = () => chart.value?.resize()
onMounted(() => window.addEventListener('resize', resizeChart))
onUnmounted(() => window.removeEventListener('resize', resizeChart))
```