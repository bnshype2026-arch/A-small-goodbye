"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
    id: string;
    photo_url: string;
    caption?: string;
}

export default function MemoryGallery({ letterId }: { letterId: string }) {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

    useEffect(() => {
        async function fetchPhotos() {
            const { data, error } = await supabase
                .from("letter_photos")
                .select("*")
                .eq("letter_id", letterId)
                .order("created_at", { ascending: true });

            if (!error && data) {
                setPhotos(data);
            }
        }
        fetchPhotos();
    }, [letterId]);

    if (photos.length === 0) return null;

    return (
        <>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "1.5rem",
                padding: "1rem"
            }}>
                {photos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        onClick={() => setSelectedPhotoIndex(index)}
                        style={{
                            aspectRatio: "1",
                            borderRadius: "8px",
                            overflow: "hidden",
                            cursor: "pointer",
                            boxShadow: "0 10px 20px rgba(0,0,0,0.1), 0 2px 5px rgba(0,0,0,0.05)",
                            position: "relative",
                            backgroundColor: "rgba(255,255,255,0.5)"
                        }}
                    >
                        <img
                            src={photo.photo_url}
                            alt={photo.caption || "Memory"}
                            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                        />
                        {/* Soft inner shadow/vignette */}
                        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)", pointerEvents: "none" }} />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedPhotoIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 100,
                            backgroundColor: "rgba(10, 8, 5, 0.9)",
                            backdropFilter: "blur(10px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <button
                            onClick={() => setSelectedPhotoIndex(null)}
                            style={{
                                position: "absolute",
                                top: "2rem",
                                right: "2rem",
                                background: "transparent",
                                border: "none",
                                color: "var(--color-cream)",
                                cursor: "pointer",
                                padding: "8px",
                                zIndex: 101,
                            }}
                        >
                            <X size={32} />
                        </button>

                        {photos.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev! - 1));
                                }}
                                style={{
                                    position: "absolute",
                                    left: "2rem",
                                    background: "transparent",
                                    border: "none",
                                    color: "var(--color-cream)",
                                    cursor: "pointer",
                                    padding: "16px",
                                    zIndex: 101,
                                    opacity: 0.7,
                                    transition: "opacity 0.2s"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}
                            >
                                <ChevronLeft size={48} />
                            </button>
                        )}

                        <motion.div
                            key={selectedPhotoIndex}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: [0, -10, 0],
                            }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{
                                opacity: { duration: 0.4 },
                                scale: { duration: 0.4 },
                                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                            }}
                            style={{
                                position: "relative",
                                maxWidth: "90vw",
                                maxHeight: "85vh",
                                boxShadow: "0 0 50px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.5)",
                                borderRadius: "4px",
                            }}
                        >
                            <img
                                src={photos[selectedPhotoIndex].photo_url}
                                alt={photos[selectedPhotoIndex].caption || "Memory"}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "80vh",
                                    objectFit: "contain",
                                    borderRadius: "4px",
                                    display: "block"
                                }}
                            />

                            {photos[selectedPhotoIndex].caption && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    style={{
                                        position: "absolute",
                                        bottom: "-3rem",
                                        left: 0,
                                        right: 0,
                                        textAlign: "center",
                                        color: "rgba(255,255,255,0.8)",
                                        fontFamily: "var(--font-serif)",
                                        fontSize: "1.1rem",
                                        letterSpacing: "0.05em",
                                        fontStyle: "italic"
                                    }}
                                >
                                    {photos[selectedPhotoIndex].caption}
                                </motion.div>
                            )}
                        </motion.div>

                        {photos.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev! + 1));
                                }}
                                style={{
                                    position: "absolute",
                                    right: "2rem",
                                    background: "transparent",
                                    border: "none",
                                    color: "var(--color-cream)",
                                    cursor: "pointer",
                                    padding: "16px",
                                    zIndex: 101,
                                    opacity: 0.7,
                                    transition: "opacity 0.2s"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}
                            >
                                <ChevronRight size={48} />
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
