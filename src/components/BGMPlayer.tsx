"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function BGMPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // We would use an actual audio file, e.g., /audio/piano-loop.mp3
        audioRef.current = new Audio("/audio/piano-loop.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleMute = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((e) => console.log("Audio play prevented:", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.button
            onClick={toggleMute}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
            style={{
                position: "fixed",
                bottom: "24px",
                left: "24px",
                zIndex: 50,
                background: "transparent",
                border: "none",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "color 0.3s ease",
            }}
            aria-label="Toggle background music"
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-main)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>
    );
}
