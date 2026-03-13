"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AmbientBackground() {
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

    useEffect(() => {
        // Generate random particles
        const newParticles = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // vw
            y: Math.random() * 100, // vh
            size: Math.random() * 4 + 2, // px
            duration: Math.random() * 20 + 10, // s
            delay: Math.random() * 5, // s
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: -1,
                overflow: "hidden",
                background: "radial-gradient(circle at center, var(--color-cream) 0%, var(--color-soft-beige) 100%)",
            }}
        >
            {/* Texture Overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.4,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: "multiply",
                }}
            />

            {/* Warm Glows */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "20%",
                    width: "40vw",
                    height: "40vw",
                    background: "radial-gradient(circle, var(--color-gold-muted) 0%, transparent 60%)",
                    filter: "blur(60px)",
                    opacity: 0.3,
                }}
            />
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                style={{
                    position: "absolute",
                    bottom: "10%",
                    right: "10%",
                    width: "50vw",
                    height: "50vw",
                    background: "radial-gradient(circle, #F4E8D1 0%, transparent 60%)",
                    filter: "blur(80px)",
                    opacity: 0.2,
                }}
            />

            {/* Floating Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: `${p.y}vh`, x: `${p.x}vw` }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        y: [`${p.y}vh`, `${p.y - 20}vh`],
                        x: [`${p.x}vw`, `${p.x + (Math.random() * 10 - 5)}vw`],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                    style={{
                        position: "absolute",
                        width: p.size,
                        height: p.size,
                        borderRadius: "50%",
                        backgroundColor: "var(--color-gold-muted)",
                        filter: "blur(1px)",
                        boxShadow: "0 0 4px var(--color-gold-muted)",
                    }}
                />
            ))}
        </div>
    );
}
