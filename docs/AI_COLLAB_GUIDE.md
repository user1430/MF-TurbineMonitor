# AI协作开发指南

## 1. 高效交互模式
### 问题报告模板
```markdown
### 环境信息
- 系统: [Windows/macOS/Linux]
- 浏览器: [Chrome 119]
- 复现步骤: 
  1. 执行`npm run dev`
  2. 访问/page/analytics
  3. 查看控制台报错

### 关键日志
```text
[Error] Chart init failed - container undefined (WindPowerCurve.vue:127)
```

### 补充说明
[截图/屏幕录制链接]
```

## 2. 协作调试流程
### 分阶段验证法
1. **现象确认阶段**：
   - 提供错误截图/视频
   - 共享最小复现代码

2. **方案迭代阶段**：
   - 每次只测试一个修改点
   - 使用标准响应格式：
   ```markdown
   [ ] 方案A: 调整容器高度
   [ ] 方案B: 修改初始化时序
   ```

3. **结果记录阶段**：
   - 更新文档记录有效方案
   - 标记未解决问题

## 3. 代码规范标准
### 修改标记规范
```diff
// 良好示例
<<<<<<< SEARCH
  margin: 10px;
=======
  margin: 12px;
>>>>>>> REPLACE
```

### 版本控制要求
- 每次提交包含：
  ```bash
  git commit -m "fix: 修复图表初始化问题 #123
  - 添加容器null检查
  - 增加重试机制"
  ```

## 4. 最佳实践案例
### 成功案例示范
**用户输入**：
"图表在Safari显示异常，Chrome正常。错误截图已附。"

**AI响应**：
<thinking>
1. 可能浏览器兼容性问题
2. 需要验证Safari的WebGL支持
3. 建议优先检查：
   - [ ] 1. 浏览器控制台警告
   - [ ] 2. echarts.init()返回值
</thinking>