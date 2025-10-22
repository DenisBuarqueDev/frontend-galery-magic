import React, { useState } from "react";

const PaymentButton = ({ email }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Chama o backend para criar a preferência
      const response = await fetch(
        "http://localhost:5000/api/payments/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar pagamento");
      }

      // Redireciona para o checkout do Mercado Pago
      window.location.href = data.init_point;
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          padding: "12px 24px",
          backgroundColor: "#3483fa",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Redirecionando..." : "Pagar Assinatura"}
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default PaymentButton;
