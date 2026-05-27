import { useEffect, useState } from "react";
import styles from "./Applications.module.css";

export default function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/app/applications_view/")
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch(console.log);
  }, []);

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this application?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/app/delete_application/${id}/`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        // remove from UI instantly
        setApplications((prev) =>
          prev.filter((app) => app.id !== id)
        );
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.applications}>
      <div className={styles.tableContainer}>
        {applications.length === 0 ? (
          <div className={styles.emptyBox}>
            <h2>No Applications Found</h2>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Position</th>
                <th>Company</th>
                <th>State</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th> {/* NEW */}
              </tr>
            </thead>

            <tbody>
              {applications.map((item) => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td>{item.jobPosition}</td>

                  <td>
                    <div className={styles.companyInfo}>
                      <div className={styles.companyLogo}>
                        {item.company?.charAt(0) || "K"}
                      </div>
                      <span>{item.company || "Kelon Team"}</span>
                    </div>
                  </td>

                  <td>{item.location}</td>
                  <td>{item.status}</td>

                  <td>
                    {item.applied_at
                      ? new Date(item.applied_at).toLocaleString()
                      : "No date"}
                  </td>

                  {/* DELETE BUTTON */}
                  <td>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}