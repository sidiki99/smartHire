import { useEffect, useState } from "react";

export default function Students() {

  const [students, setStudents] = useState([]);

  useEffect(() => {

    fetch("http://127.0.0.1:8000/students/")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h1>Student List</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

