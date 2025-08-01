import { useState } from "react";
import { X } from "lucide-react";
// import { updateUser } from "../api/apiServices/userService"; // You can enable this

export default function EditProfileModal({ user, onClose }) {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    emailId: user?.emailId || "",
    mobile: user?.mobile || "",
    profile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile") {
      setFormData((prev) => ({
        ...prev,
        profile: files[0],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("username", formData.username);
    payload.append("emailId", formData.emailId);
    payload.append("mobile", formData.mobile);
    if (formData.profile) {
      payload.append("user_profile", formData.profile);
    }

    try {
      // await updateUser(user._id, payload); // call your API here
      alert("User Updated Successfully!");
      onClose();
    } catch (error) {
      alert("Failed to update user");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-zinc-900 rounded-xl shadow-xl p-6 w-full max-w-md text-white relative">
        <X
          className="absolute top-3 right-3 cursor-pointer hover:text-red-500"
          onClick={onClose}
        />
        <h2 className="text-xl font-bold mb-4 text-green-400">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Upload */}
          <div>
            <label className="block text-sm mb-1">Profile Picture</label>
            <input
              type="file"
              name="profile"
              accept="image/*"
              onChange={handleChange}
              className="text-sm bg-zinc-800 p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="text-sm bg-zinc-800 p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              className="text-sm bg-zinc-800 p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="text-sm bg-zinc-800 p-2 rounded w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded bg-green-600 hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
