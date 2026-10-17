
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";

function ReceiptDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [receipt, setReceipt] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newAmount, setNewAmount] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/api/receipts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load receipt");
        }
        return response.json();
      })
      .then((data) => {
        setReceipt(data);
        setNewAmount(data.amount);
      })
      .catch((error) => {
        console.error("Load receipt error:", error);
        alert("Unable to load receipt. Please check the backend connection.");
      });
  }, [id, API_URL]);

  function handleEdit() {
    setIsEditing(true);
    setNewAmount(receipt.amount);
  }

  async function handleUpdate() {
    if (!newAmount || Number(newAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/api/receipts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(newAmount),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setReceipt(data);
        setIsEditing(false);
        alert("Receipt updated successfully");
      } else {
        alert(data.message || "Failed to update receipt");
      }
    } catch (error) {
      alert("Backend connection error");
    }
  }

  function handleCancel() {
    setIsEditing(false);
    setNewAmount(receipt.amount);
  }

  async function handleDelete() {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this receipt?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/receipts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Receipt deleted successfully");
        navigate("/my-receipts");
      } else {
        alert("Failed to delete receipt");
      }
    } catch (error) {
      alert("Backend connection error");
    }
  }

  if (!receipt) {
    return (
      <div>
        <Navbar />
        <p>Loading receipt...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <h1>Receipt Details</h1>

      <p>
        <strong>Store Name:</strong> {receipt.storeName}
      </p>

      <p>
        <strong>Amount:</strong> ₹{receipt.amount}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(receipt.date).toLocaleDateString()}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {receipt.categoryId || receipt.category || "Not specified"}
      </p>

      <h3>Receipt Image</h3>

      {receipt.receiptImage ? (
        <img
          src={receipt.receiptImage}
          alt={`Receipt from ${receipt.storeName}`}
          style={{
            display: "block",
            maxWidth: "100%",
            width: "400px",
            maxHeight: "500px",
            objectFit: "contain",
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            alert("The saved receipt image could not be displayed.");
          }}
        />
      ) : (
        <p>No receipt image uploaded.</p>
      )}

      {!isEditing ? (
        <div>
          <button onClick={handleEdit}>Edit Receipt</button>{" "}
          <button onClick={handleDelete}>Delete Receipt</button>
        </div>
      ) : (
        <div>
          <h3>Edit Amount</h3>

          <input
            type="number"
            min="0.01"
            step="0.01"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />

          <br />
          <br />

          <button onClick={handleUpdate}>Save Changes</button>{" "}
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ReceiptDetails;
