import Navbar from "../components/Navbar";

function ManageReceipts() {
  return (
    <div>
      <Navbar />

      <h1>Manage Receipts</h1>

      <h2>Receipt Records</h2>

      <p><strong>Store Name:</strong> POTHYS</p>
      <p><strong>Amount:</strong> ₹9,697</p>
      <p><strong>Date:</strong> 12-05-2025</p>
      <p><strong>Category:</strong> Shopping</p>

      <button>Edit Receipt</button>{" "}
      <button>Delete Receipt</button>
    </div>
  );
}

export default ManageReceipts;