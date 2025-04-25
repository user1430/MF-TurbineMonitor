# MF-TurbineMonitor 涡轮扇叶风力发电机监控系统

## 项目概述
3D可视化监控平台，用于实时展示和分析涡轮扇叶风力发电机运行状态，提供设备部件高亮拾取、拆解/组装动画、数据绑定等功能。

## 业务价值
- 🌀 3D涡轮扇叶风力发电机可视化
- 🔍 设备部件高亮拾取和交互
- 🛠️ 设备拆解/组装动画演示
- 📊 实时数据绑定和可视化展示
- 📱 响应式设计适配多种终端

## 技术栈
### 核心框架
- [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) 构建工具

### 3D可视化
- [Three.js](https://threejs.org/) 3D渲染引擎
- [GSAP](https://greensock.com/gsap/) 动画库
- [Tween.js](https://github.com/tweenjs/tween.js/) 补间动画

### 数据可视化
- [ECharts](https://echarts.apache.org/) 图表库
- [D3.js](https://d3js.org/) 数据驱动文档

### 代码规范
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [Stylelint](https://stylelint.io/) CSS规范检查

## 快速开始

### 开发环境
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 生产构建
```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构
```
├── public/            # 静态资源
├── src/
│   ├── assets/        # 静态资源
│   ├── components/    # 公共组件
│   ├── composables/   # 组合式函数  
│   ├── router/        # 路由配置
│   ├── stores/        # 状态管理
│   ├── styles/        # 全局样式
│   ├── utils/         # 工具函数
│   ├── views/         # 页面组件
│   └── main.ts        # 应用入口
├── vite.config.ts     # Vite配置
└── tsconfig.json      # TypeScript配置
```

## 开发协作
- [AI协作开发指南](./实战总结版——AI协作开发最佳实践指南.md) - 如何与AI助手高效协作开发

## 注意事项
1. 推荐使用 Node.js 18+ 版本
2. 开发时自动使用mock数据，生产环境需配置真实API
3. 3D模型资源较大，建议使用CDN加速加载

## 许可证
MIT License