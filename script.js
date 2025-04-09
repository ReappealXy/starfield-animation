document.addEventListener('DOMContentLoaded', () => {
    // 获取canvas元素和上下文
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    
    // 调整canvas大小以适应窗口
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // 初始调整和窗口大小变化时重新调整
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 星星类
    class Star {
        constructor() {
            this.reset();
            // 初始化时随机分布星星，避免全部从中心开始
            this.z = Math.random() * 2000;
            this.x = (Math.random() * 2 - 1) * this.z;
            this.y = (Math.random() * 2 - 1) * this.z;
        }
        
        // 重置星星位置
        reset() {
            // 3D坐标
            this.x = (Math.random() * 2 - 1) * 3000;
            this.y = (Math.random() * 2 - 1) * 3000;
            this.z = 2000; // 从远处开始
            
            // 星星特性
            this.radius = 1 + Math.random() * 2;
            this.originalRadius = this.radius;
            this.color = `hsl(${Math.random() * 60 + 200}, 100%, 80%)`;
            
            // 拖尾效果
            this.trail = [];
            this.maxTrailLength = Math.floor(Math.random() * 10) + 5;
        }
        
        // 更新星星位置
        update(speed, mouseX, mouseY) {
            // 保存上一个位置用于拖尾效果
            if (speed > 20) {
                this.trail.unshift({x: this.x, y: this.y, z: this.z});
                if (this.trail.length > this.maxTrailLength) {
                    this.trail.pop();
                }
            } else {
                this.trail = [];
            }
            
            // 向观察者移动
            this.z -= speed;
            
            // 根据鼠标位置调整移动方向，实现视角变化
            const mouseXOffset = (mouseX - canvas.width / 2) / (canvas.width / 2) * 10;
            const mouseYOffset = (mouseY - canvas.height / 2) / (canvas.height / 2) * 10;
            this.x += mouseXOffset * (speed / 20);
            this.y += mouseYOffset * (speed / 20);
            
            // 如果星星移出视野，重置它
            if (this.z < 1 || 
                this.x < -3000 || this.x > 3000 || 
                this.y < -3000 || this.y > 3000) {
                this.reset();
            }
        }
        
        // 绘制星星
        draw() {
            // 投影到2D平面上
            const scale = focalLength / (focalLength + this.z);
            const x2d = canvas.width / 2 + this.x * scale;
            const y2d = canvas.height / 2 + this.y * scale;
            
            // 根据距离调整大小和透明度
            const alpha = Math.min(1, (2000 - this.z) / 2000);
            const scaledRadius = this.radius * scale * 2;
            
            // 绘制拖尾
            if (this.trail.length > 1) {
                ctx.beginPath();
                ctx.moveTo(x2d, y2d);
                
                for (let i = 0; i < this.trail.length; i++) {
                    const point = this.trail[i];
                    const pointScale = focalLength / (focalLength + point.z);
                    const px = canvas.width / 2 + point.x * pointScale;
                    const py = canvas.height / 2 + point.y * pointScale;
                    const trailAlpha = alpha * (1 - i / this.trail.length);
                    
                    if (i === 0) {
                        ctx.beginPath();
                        ctx.moveTo(x2d, y2d);
                    }
                    
                    ctx.lineTo(px, py);
                    
                    if (i === this.trail.length - 1 || i % 2 === 0) {
                        ctx.strokeStyle = this.color.replace('80%)', `${trailAlpha * 100}%)`);
                        ctx.lineWidth = scaledRadius * (1 - i / this.trail.length);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(px, py);
                    }
                }
            }
            
            // 绘制星星
            ctx.beginPath();
            ctx.arc(x2d, y2d, scaledRadius, 0, Math.PI * 2);
            ctx.fillStyle = this.color.replace('80%)', `${alpha * 100}%)`);
            ctx.fill();
            
            // 添加光晕效果
            const glow = ctx.createRadialGradient(
                x2d, y2d, 0,
                x2d, y2d, scaledRadius * 2
            );
            glow.addColorStop(0, this.color.replace('80%)', `${alpha * 50}%)`));
            glow.addColorStop(1, 'transparent');
            
            ctx.beginPath();
            ctx.arc(x2d, y2d, scaledRadius * 2, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();
        }
    }
    
    // 创建星星
    const starCount = 1000;
    const stars = [];
    
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }
    
    // 视角参数
    const focalLength = 800;
    let speed = 10;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    
    // 监听鼠标移动
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // 监听滚轮事件调整速度
    window.addEventListener('wheel', (e) => {
        speed = Math.max(1, Math.min(50, speed + e.deltaY * 0.05));
    });
    
    // 触摸设备支持
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
            e.preventDefault();
        }
    }, { passive: false });
    
    // 动画循环
    function animate() {
        // 清空画布，添加渐变背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 更新并绘制每个星星
        stars.forEach(star => {
            star.update(speed, mouseX, mouseY);
            star.draw();
        });
        
        // 继续动画循环
        requestAnimationFrame(animate);
    }
    
    // 开始动画
    animate();
}); 