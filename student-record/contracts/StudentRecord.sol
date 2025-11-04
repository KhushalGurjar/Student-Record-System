// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRecord {
    struct Student {
        uint id;
        string name;
        string course;
        uint marks;
    }

    mapping(uint => Student) private students;
    uint public studentCount;

    function addStudent(uint _id, string memory _name, string memory _course, uint _marks) public {
        students[_id] = Student(_id, _name, _course, _marks);
        studentCount++;
    }

    function getStudent(uint _id) public view returns (uint, string memory, string memory, uint) {
        Student memory s = students[_id];
        return (s.id, s.name, s.course, s.marks);
    }
}
