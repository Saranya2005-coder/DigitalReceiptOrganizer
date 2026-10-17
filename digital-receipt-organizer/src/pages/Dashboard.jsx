import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [receipts, setReceipts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/api/receipts/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Request failed");
        }

        return data;
      })
      .then((data) => {
        setReceipts(data);

        const total = data.reduce(
          (sum, receipt) => sum + receipt.amount,
          0
        );

        setTotalAmount(total);

        const totals = {};

        data.forEach((receipt) => {
          const category = receipt.categoryId;

          if (totals[category]) {
            totals[category] += receipt.amount;
          } else {
            totals[category] = receipt.amount;
          }
        });

        setCategoryTotals(totals);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-container">
        <h1>Dashboard</h1>

        <p className="welcome-text">
          Welcome to Digital Receipt Organizer
        </p>

        <h2>Expense Overview</h2>

        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Receipts</h3>
            <p>{receipts.length}</p>
          </div>

          <div className="summary-card">
            <h3>Total Expenses</h3>
            <p>₹{totalAmount}</p>
          </div>
        </div>

        <h2>Category-wise Expenses</h2>

        <div className="category-cards">
          {Object.keys(categoryTotals).length === 0 ? (
            <p>No category data found</p>
          ) : (
            Object.entries(categoryTotals).map(([category, amount]) => (
              <div className="category-card" key={category}>
                <h3>{category}</h3>
                <p>₹{amount}</p>
              </div>
            ))
          )}
        </div>

        <h2>Recent Receipts</h2>

        <div className="recent-receipts">
          {receipts.length === 0 ? (
            <p>No receipts found</p>
          ) : (
            receipts.slice(0, 5).map((receipt) => (
              <div className="receipt-card" key={receipt._id}>
                <h3>{receipt.storeName}</h3>

                <p>
                  <strong>Amount:</strong> ₹{receipt.amount}
                </p>

                <p>
                  <strong>Category:</strong> {receipt.categoryId}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(receipt.date).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;