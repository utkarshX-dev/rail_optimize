import React from "react";

function NotFound() {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
        }}>
            <h1 style={{
                fontSize: "5rem",
                color: "#ff4d4f",
                margin: 0,
                fontWeight: 800,
                letterSpacing: "2px",
                textShadow: "2px 2px 8px #ffcccc"
            }}>
                404
            </h1>
            <h2 style={{
                color: "#22223b",
                margin: "0.5rem 0",
                fontWeight: 600,
                fontSize: "2rem"
            }}>
                Page Not Found
            </h2>
            <p style={{
                color: "#4a4e69",
                fontSize: "1.2rem",
                marginBottom: "2rem"
            }}>
                The page you are looking for does not exist.
            </p>
            <a
                href="/"
                style={{
                    padding: "0.75rem 2rem",
                    background: "#22223b",
                    color: "#fff",
                    borderRadius: "30px",
                    textDecoration: "none",
                    fontWeight: 600,
                    boxShadow: "0 2px 8px rgba(34,34,59,0.1)",
                    transition: "background 0.2s"
                }}
                onMouseOver={e => (e.currentTarget.style.background = "#4a4e69")}
                onMouseOut={e => (e.currentTarget.style.background = "#22223b")}
            >
                Go Home
            </a>
        </div>
    );
}

export default NotFound;