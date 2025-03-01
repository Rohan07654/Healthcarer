import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const PatientSignUp = () => {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: user?.email || "",
    phoneNumber: "",
    age: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, gender, email, phoneNumber, age, location } = formData;

    if (!firstName || !lastName || !gender || !email || !phoneNumber || !age || !location) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/patients/register`,
        formData
      );
      setUser(response.data.data);
      console.log("Signup successful", response.data);
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Patient Sign Up</h2>
      </div>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <input name="firstName" type="text" placeholder="First Name" required value={formData.firstName} onChange={handleChange} className="input-field" />
        <input name="lastName" type="text" placeholder="Last Name" required value={formData.lastName} onChange={handleChange} className="input-field" />
        <select name="gender" required value={formData.gender} onChange={handleChange} className="input-field">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="email" type="email" placeholder="Email" required disabled value={formData.email} className="input-field" />
        <input name="phoneNumber" type="tel" placeholder="Phone Number" required value={formData.phoneNumber} onChange={handleChange} className="input-field" />
        <input name="age" type="number" placeholder="Age" required value={formData.age} onChange={handleChange} className="input-field" />
        <input name="location" type="text" placeholder="Location" required value={formData.location} onChange={handleChange} className="input-field" />

        <button type="submit" className="btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default PatientSignUp;
