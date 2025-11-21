import { useState } from "react";

export default function QuoteForm({ onSubmitted }) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("message", message);

            const res = await fetch("http://localhost:8000/quote", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            setSuccess(true);
            setName("");
            setMessage("");

            if (typeof onSubmitted === "function") onSubmitted();
        } catch (err) {
            setError(err.message || "Failed to submit quote");
        } finally {
            setLoading(false);
            setTimeout(() => setSuccess(false), 2000);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="input-name">Name</label>
            <input 
                type="text" 
                name="name" 
                id="input-name" 
                value={name}
                onChange={(e) => setName(e.target.value)} 
                required 
            />
            <label htmlFor="input-message">Quote</label>
            <input 
                type="text" 
                name="message" 
                id="input-message" 
                value={message}
                onChange={(e) => setMessage(e.target.value)} 
                required 
            />
            <button type="submit" disabled={loading}>
                {loading ? "Submitting…" : "Submit"}
            </button>
            {success && <p style={{ color: "green" }}>Submitted!</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </form>
    );
}