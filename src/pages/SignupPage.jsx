import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function formatPhoneNumber(value) {
  const digits = value.replace(/\D/g, "").substring(0, 10);
  const match = digits.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return digits;
}

function isValidUSPhoneNumber(phone) {
  return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
}

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!isValidUSPhoneNumber(phone)) newErrors.phone = "Phone number must be in (123) 456-7890 format";
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [username, password, address, phone]);

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  async function handleRegister(e) {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fix errors before submitting.");
      return;
    }

    let profilePicUrl = "";

    if (profilePic) {
      try {
        setUploading(true);
        const formData = new FormData();
        formData.append("profilePic", profilePic);

        const uploadRes = await fetch("http://localhost:5000/api/auth/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        profilePicUrl = uploadData.imageUrl;

        if (!uploadRes.ok || !profilePicUrl) {
          alert("Image upload failed");
          return;
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("Image upload failed.");
        return;
      } finally {
        setUploading(false);
      }
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, address, phone, profilePicUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Registration failed");
        return;
      }

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <input
            className={`w-full p-2 bg-gray-700 rounded ${errors.username ? "border border-red-500" : ""}`}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
        </div>

        <div className="mb-4">
          <input
            className={`w-full p-2 bg-gray-700 rounded ${errors.password ? "border border-red-500" : ""}`}
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <textarea
            className={`w-full p-2 bg-gray-700 rounded ${errors.address ? "border border-red-500" : ""}`}
            placeholder="Address"
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="mb-4">
          <input
            className={`w-full p-2 bg-gray-700 rounded ${errors.phone ? "border border-red-500" : ""}`}
            type="text"
            placeholder="Phone (e.g. (123) 456-7890)"
            value={phone}
            onChange={handlePhoneChange}
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
        </div>

        <label className="block mb-2">Upload Profile Picture:</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
          accept="image/*"
        />

        <button
          type="submit"
          disabled={!isFormValid || uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-2 rounded disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
