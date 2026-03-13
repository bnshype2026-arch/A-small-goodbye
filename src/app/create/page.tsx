"use client";

import { useState } from "react";
import { verifyPasscode } from "./actions";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const isValid = await verifyPasscode(passcode);
        if (isValid) {
            setIsAuthenticated(true);
        } else {
            setError("Incorrect passcode.");
        }
        setLoading(false);
    };

    if (isAuthenticated) {
        return <AdminDashboard />;
    }

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--color-cream)",
            color: "var(--color-text-main)",
            fontFamily: "var(--font-sans)",
            position: "relative",
            zIndex: 100 // sit above global backgrounds
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "3rem",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                width: "100%",
                maxWidth: "400px",
            }}>
                <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "2rem", textAlign: "center" }}>
                    Admin Entrance
                </h1>
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input
                        type="password"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        placeholder="Enter Admin Passphrase"
                        style={{
                            padding: "1rem",
                            borderRadius: "6px",
                            border: "1px solid #ddd",
                            fontSize: "1rem",
                            outline: "none"
                        }}
                    />
                    {error && <p style={{ color: "red", fontSize: "0.85rem", margin: 0 }}>{error}</p>}
                    <button
                        type="submit"
                        disabled={loading || !passcode}
                        style={{
                            padding: "1rem",
                            backgroundColor: "var(--color-text-main)",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "1rem",
                            cursor: loading ? "wait" : "pointer"
                        }}
                    >
                        {loading ? "Verifying..." : "Enter"}
                    </button>
                </form>
            </div>
        </div>
    );
}
