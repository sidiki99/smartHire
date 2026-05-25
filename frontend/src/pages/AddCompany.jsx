import { useState } from "react";

function CompanyForm() {

  const [formData, setFormData] = useState({
    company_name: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    logo: null
  });

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

 const handleSubmit = async (e) => {

  e.preventDefault();

  const data = new FormData();

  data.append("company_name", formData.company_name);
  data.append("website", formData.website);
  data.append("email", formData.email);
  data.append("phone", formData.phone);
  data.append("address", formData.address);
  data.append("description", formData.description);

  if (formData.logo) {
    data.append("logo", formData.logo);
  }

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/app/company/",
      {
        method: "POST",
        body: data
      }
    );

    const result = await response.json();

    console.log(result);

    if (response.ok) {

      alert(result.message);

    } else {

      alert(result.error);

    }

  } catch (error) {

    console.log(error);

  }
};
  return (
    <div>

      <h2>Add Company</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="company_name"
          placeholder="Company Name"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="file"
          name="logo"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="website"
          placeholder="Website"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">
          Save
        </button>

      </form>

    </div>
  );
}

export default CompanyForm;