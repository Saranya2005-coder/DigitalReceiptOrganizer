import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddReceipt from "./pages/AddReceipt";
import MyReceipts from "./pages/MyReceipts";
import ReceiptDetails from "./pages/ReceiptDetails";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-receipt"
          element={
            <ProtectedRoute>
              <AddReceipt />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-receipts"
          element={
            <ProtectedRoute>
              <MyReceipts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/receipt/:id"
          element={
            <ProtectedRoute>
              <ReceiptDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;