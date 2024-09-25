import React, { useRef, useEffect, useState } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [light, setLight] = useState({ x: 160, y: 200 });
  const colors = ["#f5c156", "#e6616b", "#5cd3ad"];
  const boxes = useRef([]);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const box = canvas.getBoundingClientRect();
    canvas.width = box.width;
    canvas.height = box.height;
  };

  const drawLight = (ctx, light) => {
    ctx.beginPath();
    ctx.arc(light.x, light.y, 1000, 0, 2 * Math.PI);
    let gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 1000);
    gradient.addColorStop(0, "#3b4654");
    gradient.addColorStop(1, "#2c343f");
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(light.x, light.y, 20, 0, 2 * Math.PI);
    gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 5);
    gradient.addColorStop(0, "#fff");
    gradient.addColorStop(1, "#3b4654");
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  const Box = function (canvasWidth, canvasHeight) {
    this.half_size = Math.floor(Math.random() * 50 + 1);
    this.x = Math.floor(Math.random() * canvasWidth + 1);
    this.y = Math.floor(Math.random() * canvasHeight + 1);
    this.r = Math.random() * Math.PI;
    this.shadow_length = 2000;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.getDots = function () {
      const full = (Math.PI * 2) / 4;
      const p1 = {
        x: this.x + this.half_size * Math.sin(this.r),
        y: this.y + this.half_size * Math.cos(this.r),
      };
      const p2 = {
        x: this.x + this.half_size * Math.sin(this.r + full),
        y: this.y + this.half_size * Math.cos(this.r + full),
      };
      const p3 = {
        x: this.x + this.half_size * Math.sin(this.r + full * 2),
        y: this.y + this.half_size * Math.cos(this.r + full * 2),
      };
      const p4 = {
        x: this.x + this.half_size * Math.sin(this.r + full * 3),
        y: this.y + this.half_size * Math.cos(this.r + full * 3),
      };

      return { p1, p2, p3, p4 };
    };

    this.rotate = function () {
      const speed = (20 - this.half_size) / 20;
      this.r += speed * 0.002;
      this.x += speed;
      this.y += speed;
    };

    this.draw = function (ctx, canvasWidth, canvasHeight) {
      const dots = this.getDots();
      ctx.beginPath();
      ctx.moveTo(dots.p1.x, dots.p1.y);
      ctx.lineTo(dots.p2.x, dots.p2.y);
      ctx.lineTo(dots.p3.x, dots.p3.y);
      ctx.lineTo(dots.p4.x, dots.p4.y);
      ctx.fillStyle = this.color;
      ctx.fill();

      if (this.y - this.half_size > canvasHeight) {
        this.y -= canvasHeight + 100;
      }
      if (this.x - this.half_size > canvasWidth) {
        this.x -= canvasWidth + 100;
      }
    };

    this.drawShadow = function (ctx, light) {
      const dots = this.getDots();
      const points = [];

      for (let dot in dots) {
        const angle = Math.atan2(light.y - dots[dot].y, light.x - dots[dot].x);
        const endX = dots[dot].x + this.shadow_length * Math.sin(-angle - Math.PI / 2);
        const endY = dots[dot].y + this.shadow_length * Math.cos(-angle - Math.PI / 2);
        points.push({
          endX: endX,
          endY: endY,
          startX: dots[dot].x,
          startY: dots[dot].y,
        });
      }

      for (let i = points.length - 1; i >= 0; i--) {
        const n = i === 3 ? 0 : i + 1;
        ctx.beginPath();
        ctx.moveTo(points[i].startX, points[i].startY);
        ctx.lineTo(points[n].startX, points[n].startY);
        ctx.lineTo(points[n].endX, points[n].endY);
        ctx.lineTo(points[i].endX, points[i].endY);
        ctx.fillStyle = "#2c343f";
        ctx.fill();
      }
    };
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawLight(ctx, light);

    boxes.current.forEach((box, i) => {
      box.rotate();
      box.drawShadow(ctx, light);
    });

    boxes.current.forEach((box, i) => {
      box.draw(ctx, canvas.width, canvas.height);
    });

    requestAnimationFrame(draw);
  };

  const handleMouseMove = (e) => {
    setLight({ x: e.offsetX || e.layerX, y: e.offsetY || e.layerY });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    resizeCanvas();

    while (boxes.current.length < 14) {
      boxes.current.push(new Box(canvas.width, canvas.height));
    }

    draw();

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [light]);

  return <canvas ref={canvasRef} id="canvas" style={{ width: "100%", height: "100vh",background: "#2c343f",position:"fixed", zIndex:-1}} />;
};

export default CanvasComponent;
