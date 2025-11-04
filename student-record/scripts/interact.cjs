const hre = require("hardhat");

async function main() {
  const StudentRecord = await hre.ethers.getContractFactory("StudentRecord");
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // 👈 change this
  const studentRecord = await StudentRecord.attach(contractAddress);

  console.log("Connected to contract at:", contractAddress);

  // Add a student
  const tx = await studentRecord.addStudent(1, "Alice", "Blockchain", 95);
  await tx.wait();
  console.log("✅ Student added successfully!");

  // Fetch student details
  const student = await studentRecord.getStudent(1);
  console.log("📘 Student Details:");
  console.log("ID:", student[0].toString());
  console.log("Name:", student[1]);
  console.log("Course:", student[2]);
  console.log("Marks:", student[3].toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
