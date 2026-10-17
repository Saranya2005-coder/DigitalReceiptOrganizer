import Navbar from "../components/Navbar";
function Profile() {
  return (
    <div>
      <Navbar />
      <h1>Digital Receipt Organizer</h1>

      <h2>My Profile</h2>

      <p><strong>Name:</strong> User Name</p>
      <p><strong>Email:</strong> user@example.com</p>

      <button>Edit Profile</button>
      <button>Logout</button>
    </div>
  );
}

export default Profile;