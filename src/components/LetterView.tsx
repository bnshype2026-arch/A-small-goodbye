"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommentSection from "@/components/CommentSection";
import SecretCrack from "@/components/SecretCrack";

interface LetterViewProps {
    letterData: any;
    isOpening: boolean;
    onClose: () => void;
}

export default function LetterView({ letterData, isOpening, onClose }: LetterViewProps) {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (!isOpening) {
            setShowContent(true);
        } else {
            const timer = setTimeout(() => setShowContent(true), 3500); // Wait for unfold
            return () => clearTimeout(timer);
        }
    }, [isOpening]);

    const paperVariants: any = {
        hidden: {
            scaleY: 0.1,
            scaleX: 0.8,
            opacity: 0,
            y: 100,
            rotateX: 45
        },
        unfolding: {
            scaleY: [0.1, 0.5, 1],
            scaleX: [0.8, 0.9, 1],
            opacity: [0, 1, 1],
            y: [100, 0, 0],
            rotateX: [45, -10, 0],
            transition: {
                duration: 3,
                ease: "easeInOut",
                times: [0, 0.6, 1]
            }
        },
        reading: {
            scaleY: 1,
            scaleX: 1,
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { duration: 0.8 }
        },
        exit: {
            scaleY: 0.1,
            scaleX: 0.8,
            opacity: 0,
            y: 100,
            rotateX: -45,
            transition: { duration: 1.5, ease: "easeInOut" }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 30,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "4rem 2rem",
                overflowY: "auto",
                overflowX: "hidden",
                backgroundColor: "rgba(253, 251, 247, 0.6)",
                backdropFilter: "blur(5px)",
            }}
        >
            <motion.div
                variants={paperVariants}
                initial="hidden"
                animate={isOpening ? "unfolding" : "reading"}
                exit="exit"
                style={{
                    width: "100%",
                    maxWidth: "700px",
                    minHeight: "80vh",
                    backgroundColor: "#FDFBF7",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                    borderRadius: "4px",
                    boxShadow: "0 20px 60px rgba(100,80,60,0.15), 0 2px 10px rgba(100,80,60,0.05)",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    transformOrigin: "bottom center",
                }}
            >
                {/* Paper folds textures (subtle horizontal lines) */}
                {!showContent && (
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
                        <div style={{ position: "absolute", top: "33%", left: 0, right: 0, height: "1px", background: "rgba(0,0,0,0.03)", boxShadow: "0 1px 2px rgba(255,255,255,0.5)" }} />
                        <div style={{ position: "absolute", top: "66%", left: 0, right: 0, height: "1px", background: "rgba(0,0,0,0.03)", boxShadow: "0 1px 2px rgba(255,255,255,0.5)" }} />
                    </div>
                )}

                <AnimatePresence>
                    {showContent && letterData && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            style={{
                                padding: "4rem 3rem",
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                            }}
                        >
                            <h1 style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "2rem",
                                color: "var(--color-text-main)",
                                marginBottom: "3rem"
                            }}>
                                Dear {letterData.recipient_name},
                            </h1>

                            <div
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "1.2rem",
                                    lineHeight: 1.8,
                                    color: "var(--color-text-main)",
                                    whiteSpace: "pre-wrap",
                                    marginBottom: "4rem"
                                }}
                            >
                                {letterData.letter_content}
                            </div>

                            {/* Secret Gallery Crack */}
                            {letterData.gallery_enabled && (
                                <SecretCrack letterId={letterData.id} />
                            )}

                            <hr style={{ border: "none", borderTop: "1px dashed var(--color-gold-muted)", opacity: 0.3, margin: "4rem 0 2rem 0" }} />

                            <CommentSection letterId={letterData.id} />

                            <div style={{ marginTop: "4rem", textAlign: "center" }}>
                                <button
                                    onClick={onClose}
                                    style={{
                                        padding: "0.8rem 2rem",
                                        backgroundColor: "transparent",
                                        color: "var(--color-text-muted)",
                                        border: "1px solid var(--color-gold-muted)",
                                        borderRadius: "30px",
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.9rem",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "var(--color-gold-muted)";
                                        e.currentTarget.style.color = "var(--color-cream)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "transparent";
                                        e.currentTarget.style.color = "var(--color-text-muted)";
                                    }}
                                >
                                    Close Letter
                                </button>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </motion.div>
    );
}
