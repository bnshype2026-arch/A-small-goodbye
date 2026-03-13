"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X, Trash2 } from "lucide-react";

interface RepliesModalProps {
    letterId: string;
    onClose: () => void;
}

export default function RepliesModal({ letterId, onClose }: RepliesModalProps) {
    const [replies, setReplies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReplies();
    }, []);

    const fetchReplies = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("comments")
            .select("*")
            .eq("letter_id", letterId)
            .order("created_at", { ascending: false });

        if (data) {
            setReplies(data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this reply?")) return;
        await supabase.from("comments").delete().eq("id", id);
        setReplies(replies.filter(r => r.id !== id));
    };

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            padding: "2rem"
        }}>
            <div style={{
                backgroundColor: "white",
                borderRadius: "8px",
                width: "100%",
                maxWidth: "600px",
                maxHeight: "80vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}>
                <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ fontFamily: "var(--font-serif)", margin: 0 }}>Replies</h2>
                    <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X /></button>
                </div>

                <div style={{ padding: "2rem", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {loading ? (
                        <p style={{ textAlign: "center", color: "#888" }}>Loading replies...</p>
                    ) : replies.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#888" }}>No replies found.</p>
                    ) : (
                        replies.map((reply) => (
                            <div key={reply.id} style={{
                                padding: "1rem",
                                backgroundColor: "#f9f9f9",
                                borderRadius: "8px",
                                border: "1px solid #eaeaea",
                                position: "relative"
                            }}>
                                <button
                                    onClick={() => handleDelete(reply.id)}
                                    style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "red", cursor: "pointer", opacity: 0.6 }}
                                    title="Delete Reply"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>{reply.name}</div>
                                <div style={{ fontSize: "0.8rem", color: "#888", marginBottom: "0.75rem" }}>
                                    {new Date(reply.created_at).toLocaleString()}
                                </div>
                                <div style={{ whiteSpace: "pre-wrap", color: "#333", fontSize: "0.95rem", lineHeight: 1.5 }}>
                                    {reply.message}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
