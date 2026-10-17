
import { useState } from "react";
import Navbar from "../components/Navbar";

function AddReceipt() {
  const [storeName, setStoreName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [receiptImage, setReceiptImage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!storeName || !amount || !date || !category) {
      alert("Please fill all required fields");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again");
      return;
    }

    const receiptData = {
      receiptId: "R" + Date.now(),
      userId: "U001",
      categoryId: category,
      storeName,
      amount: Number(amount),
      date,
      receiptImage: ""
    };

    // Temporarily store the selected image as a data URL.
    // The backend must support saving this field for persistence.
    if (receiptImage) {
      const reader = new FileReader();

      reader.onload = async () => {
        receiptData.receiptImage = reader.result;
        await saveReceipt(receiptData, token);
      };

      reader.onerror = () => {
        alert("Unable to read the selected image");
      };

      reader.readAsDataURL(receiptImage);
    } else {
      await saveReceipt(receiptData, token);
    }
  }

  async function saveReceipt(receiptData, token) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/receipts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(receiptData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Receipt saved successfully");
        setStoreName("");
        setAmount("");
        setDate("");
        setCategory("");
        setReceiptImage(null);

        const fileInput = document.getElementById("receiptImage");
        if (fileInput) fileInput.value = "";
      } else {
        alert(data.message || "Failed to save receipt");
      }
    } catch (error) {
      console.error("Save receipt error:", error);
      alert("Unable to save receipt. Check the backend connection.");
    }
  }

  return (
    <div>
      <Navbar />

      <h1>Add Receipt</h1>

      <form onSubmit={handleSubmit}>
        <label>Store Name</label>
        <br />
        <input
          type="text"
          placeholder="Enter Store Name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          required
        />

        <br /><br />

        <label>Amount</label>
        <br />
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />

        <br /><br />

        <label>Date</label>
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <br /><br />

        <label>Category</label>
        <br />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>

        <br /><br />

        <label>Receipt Image</label>
        <br />
        <input
          id="receiptImage"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setReceiptImage(e.target.files?.[0] || null)
          }
        />

        <br /><br />

        <button type="submit">Save Receipt</button>
      </form>
    </div>
  );
}

export default AddReceipt;
