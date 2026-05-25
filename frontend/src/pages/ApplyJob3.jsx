import { useEffect, useState } from "react";

export default function ApplyJob({ selectedJob, currentUser }) {

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const BASE_URL = "http://127.0.0.1:8000/app";

  // fetch user resumes
  useEffect(() => {
    async function fetchResumes() {
      const res = await fetch(`${BASE_URL}/resumes/`, {
        credentials: "include",
      });
      const data = await res.json();
      setResumes(data);
    }

    fetchResumes();
  }, []);

  // submit application
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("job", selectedJob.id);
    formData.append("resume", selectedResume);
    formData.append("cover_letter", coverLetter);

    const res = await fetch(`${BASE_URL}/apply_job/`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Apply for Job</h2>

      {/* USER NAME */}
      {/* <p><b>User:</b> {currentUser.username}</p> */}

      {/* JOB TITLE */}
      <p><b>Position:</b> {selectedJob.title}</p>

      <form onSubmit={handleSubmit}>

        {/* SELECT RESUME */}
        <label>Select Resume:</label>
        <select
          value={selectedResume}
          onChange={(e) => setSelectedResume(e.target.value)}
        >
          <option value="">-- Choose Resume --</option>
          {resumes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.title}
            </option>
          ))}
        </select>

        <br /><br />

        {/* COVER LETTER */}
        <textarea
          placeholder="Cover Letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Apply Now
        </button>

      </form>
    </div>
  );
}