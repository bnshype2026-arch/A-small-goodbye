"use client";

import { motion } from "framer-motion";

interface EnvelopeSceneProps {
    isZoomed: boolean;
    onClick?: () => void;
}

export default function EnvelopeScene({ isZoomed, onClick }: EnvelopeSceneProps) {
    return (
        <motion.div
            onClick={onClick}
            animate={{
                scale: isZoomed ? 1.5 : 1.1, // slightly larger base
                y: isZoomed ? 50 : 0,
            }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: "relative",
                width: "min(320px, 90vw)",
                aspectRatio: "320/210",
                cursor: onClick ? "pointer" : "default",
                perspective: "1200px",
                zIndex: 10,
            }}
        >
            {/* Soft Under-Glow */}
            <motion.div
                animate={{
                    opacity: isZoomed ? 0 : [0.4, 0.6, 0.4],
                    scale: isZoomed ? 0.8 : [0.9, 1.1, 0.9],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    inset: -30,
                    background: "radial-gradient(ellipse at center, rgba(212,175,55,0.3) 0%, transparent 60%)",
                    filter: "blur(20px)",
                    zIndex: -1,
                    pointerEvents: "none"
                }}
            />

            {/* Floating animation wrapper */}
            <motion.div
                animate={
                    !isZoomed
                        ? {
                            y: [-12, 12, -12],
                            rotateX: [3, -3, 3],
                            rotateY: [-3, 3, -3],
                            rotateZ: [-1, 1, -1]
                        }
                        : {
                            y: 0,
                            rotateX: 5,
                            rotateY: 0,
                            rotateZ: 0
                        }
                }
                transition={{
                    duration: 7,
                    repeat: isZoomed ? 0 : Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Envelope Body */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "#EFEBE1",
                        borderRadius: "6px",
                        boxShadow: isZoomed
                            ? "0 40px 80px rgba(90,70,50,0.4)"
                            : "0 20px 40px rgba(90,70,50,0.2), inset 0 0 40px rgba(180,160,140,0.1)",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E")`,
                        transition: "box-shadow 1.8s ease",
                        overflow: "hidden"
                    }}
                >
                    {/* Gold Foil Border */}
                    <div style={{
                        position: "absolute",
                        inset: "8px",
                        border: "1px solid rgba(212,175,55,0.4)",
                        borderRadius: "4px",
                        pointerEvents: "none",
                        boxShadow: "inset 0 0 10px rgba(212,175,55,0.1)"
                    }} />

                    {/* Fold Lines */}
                    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4, mixBlendMode: 'multiply' }}>
                        <defs>
                            <filter id="drop-shadow">
                                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#8C7A6B" floodOpacity="0.4" />
                            </filter>
                        </defs>
                        {/* Top flap */}
                        <path d="M 0 0 L 160 115 L 320 0" fill="transparent" stroke="#A89A8E" strokeWidth="2" filter="url(#drop-shadow)" />
                        {/* Bottom flap */}
                        <path d="M 0 210 L 160 95 L 320 210" fill="transparent" stroke="#A89A8E" strokeWidth="1" />
                        {/* Side flaps */}
                        <path d="M 0 0 L 140 105 L 0 210" fill="transparent" stroke="#A89A8E" strokeWidth="1" />
                        <path d="M 320 0 L 180 105 L 320 210" fill="transparent" stroke="#A89A8E" strokeWidth="1" />
                    </svg>

                    {/* Decorative Ribbon (Vertical) */}
                    <div style={{
                        position: "absolute",
                        left: "40px",
                        top: 0,
                        bottom: 0,
                        width: "12px",
                        backgroundColor: "rgba(139,0,0,0.8)",
                        boxShadow: "2px 0 5px rgba(0,0,0,0.1), inset -2px 0 4px rgba(0,0,0,0.2)",
                        opacity: 0.9
                    }} />

                    {/* Postage Stamp (Faux) */}
                    <div style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        width: "35px",
                        height: "45px",
                        backgroundColor: "#FAF9F6",
                        border: "1.5px dashed #C8BCA7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0.8,
                        transform: "rotate(4deg)",
                        boxShadow: "1px 1px 3px rgba(0,0,0,0.1)"
                    }}>
                        <div style={{ width: "25px", height: "30px", border: "1px solid #E8E0D5", borderRadius: "50%", opacity: 0.5 }} />
                    </div>

                    {/* Wax Seal */}
                    <div
                        style={{
                            position: "absolute",
                            top: "105px",
                            left: "160px",
                            transform: "translate(-50%, -50%)",
                            width: "56px",
                            height: "56px",
                            borderRadius: "50%",
                            backgroundColor: "#7c0a02", // deeper richer red
                            boxShadow: "inset 0 3px 6px rgba(255,100,100,0.3), inset 0 -6px 8px rgba(0,0,0,0.5), 0 6px 12px rgba(0,0,0,0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 2,
                        }}
                    >
                        {/* Soft inner ring for the wax imprint */}
                        <div style={{
                            position: "absolute",
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            border: "2px solid rgba(0,0,0,0.15)",
                            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)"
                        }} />
                        <span style={{
                            color: "rgba(255,230,200,0.85)",
                            fontFamily: "var(--font-serif)",
                            fontSize: "1.6rem",
                            textShadow: "0 2px 3px rgba(0,0,0,0.6)",
                            fontWeight: "bold",
                            fontStyle: "italic"
                        }}>S</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
