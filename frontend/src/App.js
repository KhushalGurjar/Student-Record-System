import React, { useState } from "react";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import contractABI from "./StudentRecordABI.json"; // you'll create this file

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [account, setAccount] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [marks, setMarks] = useState("");
  const [student, setStudent] = useState(null);

  // Connect wallet
  async function connectWallet() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask!");
    }
  }

  // Add student
  async function addStudent() {
    if (!window.ethereum) return alert("MetaMask not found!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.addStudent(
      parseInt(id),
      name,
      course,
      parseInt(marks)
    );
    await tx.wait();
    alert("✅ Student added successfully!");
  }

  // Get student
  async function getStudent() {
    if (!window.ethereum) return alert("MetaMask not found!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const data = await contract.getStudent(parseInt(id));
    setStudent({
      id: data[0].toString(),
      name: data[1],
      course: data[2],
      marks: data[3].toString(),
    });
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-3 text-center">🎓 Blockchain Student Record System</h2>

      <div className="text-center mb-4">
        {!account ? (
          <button className="btn btn-primary" onClick={connectWallet}>
            Connect MetaMask
          </button>
        ) : (
          <span className="badge bg-success">Connected: {account}</span>
        )}
      </div>

      <div className="card p-4 shadow-lg mb-4">
        <h4>Add Student</h4>
        <input
          type="number"
          className="form-control mb-2"
          placeholder="ID"
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Course"
          onChange={(e) => setCourse(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Marks"
          onChange={(e) => setMarks(e.target.value)}
        />
        <button className="btn btn-success" onClick={addStudent}>
          Add Student
        </button>
      </div>

      <div className="card p-4 shadow-lg">
        <h4>Get Student Info</h4>
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Enter Student ID"
          onChange={(e) => setId(e.target.value)}
        />
        <button className="btn btn-info" onClick={getStudent}>
          Fetch Student
        </button>

        {student && (
          <div className="mt-3">
            <p><strong>ID:</strong> {student.id}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>Marks:</strong> {student.marks}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
