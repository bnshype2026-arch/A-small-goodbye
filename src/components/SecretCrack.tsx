"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MemoryGallery from "@/components/MemoryGallery";

export default function SecretCrack({ letterId }: { letterId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div style={{ margin: "2rem 0", position: "relative" }}>
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "1rem" }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => setIsOpen(true)}
                    >
                        <motion.div
                            animate={{
                                opacity: isHovered ? [0.6, 1, 0.6] : 0.6,
                                scaleX: isHovered ? 1.05 : 1,
                                boxShadow: isHovered ? "0 0 10px rgba(212,175,55,0.4)" : "none",
                            }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                width: "80px",
                                height: "2px",
                                backgroundColor: "rgba(100, 90, 80, 0.3)",
                                position: "relative",
                                borderRadius: "50%",
                            }}
                        >
                            {/* Glowing particles in the crack */}
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ position: "absolute", inset: -10, background: "radial-gradient(ellipse at center, rgba(212,175,55,0.2) 0%, transparent 70%)" }}
                                />
                            )}
                        </motion.div>

                        <motion.span
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            style={{
                                marginLeft: "1rem",
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.75rem",
                                color: "var(--color-gold-muted)",
                                letterSpacing: "0.05em",
                                fontStyle: "italic",
                                position: "absolute",
                                right: "10%",
                                pointerEvents: "none"
                            }}
                        >
                            Something more is hidden here...
                        </motion.span>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        <div style={{
                            position: "relative",
                            padding: "2rem 0",
                            marginTop: "2rem",
                            borderTop: "1px dashed rgba(212,175,55,0.3)",
                            borderBottom: "1px dashed rgba(212,175,55,0.3)"
                        }}>
                            <h4 style={{
                                fontFamily: "var(--font-serif)",
                                textAlign: "center",
                                color: "var(--color-gold-muted)",
                                marginBottom: "2rem",
                                fontSize: "1.2rem",
                                letterSpacing: "0.1em"
                            }}>
                                Memories
                            </h4>

                            <MemoryGallery letterId={letterId} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
