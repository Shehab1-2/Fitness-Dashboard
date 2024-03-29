import React, { useRef, useEffect } from 'react';
import './CustomCursor.css'; // Ensure you have this CSS file in your project

const CustomCursor = () => {
    const canvasRef = useRef(null);
    const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    const params = {
        pointsNumber: 40,
        widthFactor: 0.3,
        mouseThreshold: 0.6,
        spring: 0.4,
        friction: 0.5
    };
    let mouseMoved = false;
    const trail = Array.from({ length: params.pointsNumber }, () => ({ ...pointer, dx: 0, dy: 0 }));

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const updateMousePosition = (eX, eY) => {
            pointer.x = eX;
            pointer.y = eY;
        };

        const update = (t) => {
            if (!mouseMoved) {
                pointer.x = (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) * window.innerWidth;
                pointer.y = (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) * window.innerHeight;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            trail.forEach((p, pIdx) => {
                const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
                const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
                p.dx += (prev.x - p.x) * spring;
                p.dy += (prev.y - p.y) * spring;
                p.dx *= params.friction;
                p.dy *= params.friction;
                p.x += p.dx;
                p.y += p.dy;
            });

            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(trail[0].x, trail[0].y);
            for (let i = 1; i < trail.length - 1; i++) {
                const xc = 0.5 * (trail[i].x + trail[i + 1].x);
                const yc = 0.5 * (trail[i].y + trail[i + 1].y);
                ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
                ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
                ctx.stroke();
            }
            ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
            ctx.stroke();
            
            window.requestAnimationFrame(update);
        };

        const handleMouseMove = (e) => {
            mouseMoved = true;
            updateMousePosition(e.pageX, e.pageY);
        };

        const handleTouchMove = (e) => {
            mouseMoved = true;
            updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
        };

        const setupCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("resize", setupCanvas);

        setupCanvas();
        update(0);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("resize", setupCanvas);
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} />
            <div className="links">
                <a href="https://dev.to/uuuuuulala/coding-an-interactive-and-damn-satisfying-cursor-7-simple-steps-2kb-of-code-1c8b" target="_blank">
                    tutorial<img className="icon" src="https://ksenia-k.com/img/icons/link.svg" alt="Link Icon" />
                </a>
            </div>
        </>
    );
};

export default CustomCursor;
