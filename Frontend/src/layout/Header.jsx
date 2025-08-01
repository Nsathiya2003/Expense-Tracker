import { useState } from "react";
import { Bell, Pencil } from "lucide-react";
import { useCustomQuery, useCustomMutation } from "../api/apiServices/customFunction";
import { getUserById, updateUser } from "../api/apiServices/userService";
import { toast } from "react-toastify";

export default function Header() {
  const user_id = localStorage.getItem("user_id");
  const { data, refetch } = useCustomQuery({
    key: ["user", user_id],
    fetchfn: () => getUserById(user_id),
    enabled: !!user_id,
  });

  const user = data?.data;
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user?.username || "",
    emailId: user?.emailId || "",
    mobile: user?.mobile || "",
  });

  const { mutate: updateUserMutation, isLoading } = useCustomMutation({
    mutatefn: updateUser,
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Profile updated successfully!");
      setIsEditing(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed!");
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUserMutation({ userId: user_id, ...editData });
  };

  return (
    <div className="bg-zinc-800 px-6 py-3 text-white flex justify-end items-center relative shadow-md rounded-md">
      <Bell size={22} className="cursor-pointer text-white mr-4" />

      <div className="relative">
        <img
          src={`http://localhost:5000/uploads/users/${user?.user_profile}`}
          alt="profile"
          className="w-10 h-10 rounded-full border-4 border-white-900 cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)}
        />

        {/* Dropdown */}
        <div
          className={`absolute right-0 mt-3 w-80 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl z-50 p-5 transition-all duration-300 ease-in-out origin-top ${
            showDropdown ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          {/* User Info */}
          <div className="flex flex-col items-center text-center mb-4">
            <img
              src={`http://localhost:5000/uploads/users/${user?.user_profile}`}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-white-900"
            />
          </div>

          {/* Editable Fields */}
          <div className="text-sm text-white space-y-2">
            <div>
              <label className="text-gray-400">Username:</label>
              {isEditing ? (
                <input
                  name="username"
                  value={editData.username}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-1 rounded bg-zinc-800 border border-zinc-600"
                />
              ) : (
                <p>{user?.username}</p>
              )}
            </div>

            <div>
              <label className="text-gray-400">Email:</label>
              {isEditing ? (
                <input
                  name="emailId"
                  value={editData.emailId}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-1 rounded bg-zinc-800 border border-zinc-600"
                />
              ) : (
                <p>{user?.emailId}</p>
              )}
            </div>

            <div>
              <label className="text-gray-400">Mobile:</label>
              {isEditing ? (
                <input
                  name="mobile"
                  value={editData.mobile}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-1 rounded bg-zinc-800 border border-zinc-600"
                />
              ) : (
                <p>{user?.mobile}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-end gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-1"
              >
                <Pencil size={16} /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
