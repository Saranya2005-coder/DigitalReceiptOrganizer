
import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function MyReceipts() {
  const [receipts, setReceipts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_URL;

    if (!token) {
      alert("Please login again to view your receipts.");
      return;
    }

    fetch(`${API_URL}/api/receipts/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load receipts");
        }

        return data;
      })
      .then((data) => {
        const receiptList = Array.isArray(data)
          ? data
          : Array.isArray(data.receipts)
          ? data.receipts
          : [];

        setReceipts(receiptList);
      })
      .catch((error) => {
        console.error("Error loading receipts:", error);
        alert(error.message || "Unable to load receipts.");
      });
  }, []);

  const filteredReceipts = useMemo(() => {
    const search = searchText.toLowerCase();

    const result = receipts.filter((receipt) => {
      const storeName = String(receipt.storeName || "").toLowerCase();
      const category = String(
        receipt.categoryId || receipt.category || ""
      );

      const matchesSearch =
        storeName.includes(search) ||
        category.toLowerCase().includes(search);

      const matchesCategory =
        categoryFilter === "All" ||
        category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    if (sortOption === "amountLow") {
      result.sort((a, b) => Number(a.amount) - Number(b.amount));
    } else if (sortOption === "amountHigh") {
      result.sort((a, b) => Number(b.amount) - Number(a.amount));
    } else if (sortOption === "dateNew") {
      result.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else if (sortOption === "dateOld") {
      result.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    }

    return result;
  }, [receipts, searchText, categoryFilter, sortOption]);

  return (
    <div>
      <Navbar />

      <h1>My Receipts</h1>

      <input
        type="text"
        placeholder="Search by store or category"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <br />
      <br />

      <label>Filter by Category: </label>

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Others">Others</option>
      </select>

      <br />
      <br />

      <label>Sort Receipts: </label>

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="none">None</option>
        <option value="amountLow">Amount: Low to High</option>
        <option value="amountHigh">Amount: High to Low</option>
        <option value="dateNew">Date: Newest First</option>
        <option value="dateOld">Date: Oldest First</option>
      </select>

      <h2>Receipt List</h2>

      {filteredReceipts.length === 0 ? (
        <p>No receipts found</p>
      ) : (
        filteredReceipts.map((receipt) => (
          <div key={receipt._id || receipt.receiptId}>
            <p>
              <strong>Store Name:</strong> {receipt.storeName}
            </p>

            <p>
              <strong>Amount:</strong> ₹{receipt.amount}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {receipt.date
                ? new Date(receipt.date).toLocaleDateString()
                : "Not available"}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {receipt.categoryId || receipt.category || "Not specified"}
            </p>

            <Link to={"/receipt/" + receipt._id}>
              View Details
            </Link>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default MyReceipts;
