# 🌌 星际穿梭动画效果

![星际穿梭动画](https://img.shields.io/badge/星际穿梭-Canvas动画-blue)
![Claude Agent生成](https://img.shields.io/badge/Claude%20Agent-生成-purple)
![Cursor IDE](https://img.shields.io/badge/Cursor-IDE-orange)

这是一个基于Canvas和JavaScript创建的沉浸式星际穿梭动画效果。通过3D坐标系转换和透视投影公式，结合鼠标交互实现了具有深度感的星空飞行体验。

> 📝 **特别说明：** 本项目完全由Cursor IDE结合Claude Agent AI助手生成，展示了AI辅助编程的强大能力。

## ✨ 演示效果

- 通过移动鼠标可以改变飞行视角
- 使用鼠标滚轮可以调整速度
- 高速时星星会产生炫酷的拖尾效果
- 星星大小和亮度会随距离变化

## 🚀 功能特点

- **3D星空效果**：使用透视投影实现逼真深度感
- **视角变化**：通过鼠标位置控制视角转向
- **速度控制**：滚轮调节飞行速度
- **拖尾效果**：高速飞行时出现星星拖尾
- **动态渲染**：随距离变化的星星大小和亮度
- **全屏体验**：自适应窗口大小的全屏Canvas
- **触摸支持**：适配移动设备的触摸交互

## 🛠️ 技术实现

- 使用Canvas API进行高效2D渲染
- JavaScript ES6类实现星星对象管理
- 透视投影公式：`scale = focalLength / (focalLength + z)`
- `requestAnimationFrame`实现平滑动画循环
- 渐变填充实现星星光晕效果
- 事件监听实现交互控制

## 📊 代码亮点

```javascript
// 星星3D到2D的投影计算
const scale = focalLength / (focalLength + this.z);
const x2d = canvas.width / 2 + this.x * scale;
const y2d = canvas.height / 2 + this.y * scale;

// 根据距离调整大小和透明度
const alpha = Math.min(1, (2000 - this.z) / 2000);
const scaledRadius = this.radius * scale * 2;
```

## 📁 项目结构

- `index.html` - 主HTML文件
- `style.css` - 样式文件
- `script.js` - JavaScript实现逻辑

## 📥 使用方法

1. 克隆仓库到本地
   ```bash
   git clone https://github.com/你的用户名/星际穿梭动画.git
   ```

2. 直接在浏览器中打开index.html文件

3. 互动控制：
   - 移动鼠标改变视角
   - 使用鼠标滚轮调整速度（向上滚动加速，向下滚动减速）

## 💡 AI生成过程

本项目是通过以下AI辅助流程完成的：

1. 使用Cursor IDE作为开发环境
2. 通过Claude Agent 3.7分析需求并规划项目结构
3. AI自动生成HTML、CSS和JavaScript代码
4. 实现3D坐标系转换、透视投影和动画效果
5. 添加交互控制和视觉优化

整个项目无需人工编码，完全由AI根据需求描述生成，展示了当前AI辅助编程的实际能力。

## 🔄 可扩展方向

- 添加更多星星形状和颜色变化
- 实现更复杂的3D空间元素
- 加入背景音效增强沉浸感
- 添加方向键控制支持

## 📄 许可证

MIT

---

Made with ❤️ using [Cursor](https://cursor.sh/) + [Claude](https://claude.ai/) 