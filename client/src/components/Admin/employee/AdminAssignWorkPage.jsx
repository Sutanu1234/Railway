import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const EMPLOYEES_PER_PAGE = 10;

export default function AdminAssignWork() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/employee/employees/details/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setEmployees(res.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  const filtered = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.Employee_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / EMPLOYEES_PER_PAGE);
  const startIndex = (currentPage - 1) * EMPLOYEES_PER_PAGE;
  const currentEmployees = filtered.slice(
    startIndex,
    startIndex + EMPLOYEES_PER_PAGE
  );
  const remaining = Math.max(
    filtered.length - startIndex - currentEmployees.length,
    0
  );

  const handleAssign = async (empId, train, date) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/employee/job-schedules-create/",
        {
          employee: empId,
          train_id: train,
          date: date, // You must make sure the backend accepts this
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Job assigned successfully!");
      setAssignments((prev) => ({
        ...prev,
        [empId]: { trainNumber: train, date: date },
      }));
    } catch (error) {
      console.error("Error assigning job:", error);
      alert("Failed to assign job. Please try again.");
    }
  };

  return (
    <Card className="p-4 w-full border-0">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Assign Work to TTE</h2>

        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Search by name or ID"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setCurrentPage(1);
            }}
          >
            Clear
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Assign Work</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentEmployees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.Employee_id}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.phone}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>
                <Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Assign</Button>
  </PopoverTrigger>
  <PopoverContent className="w-72">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const train = e.target.train.value;
        const date = e.target.date.value;
        handleAssign(emp.id, train, date);
      }}
      className="space-y-3"
    >
      <div className="space-y-2">
        <Label>Employee ID</Label>
        <Input value={emp.Employee_id} readOnly />
      </div>
      <div className="space-y-2">
        <Label>Train Number</Label>
        <Input name="train" required />
      </div>
      <div className="space-y-2">
        <Label>Assignment Date</Label>
        <Input name="date" type="date" required />
      </div>
      <Button type="submit" className="w-full mt-2">
        Confirm
      </Button>
    </form>
  </PopoverContent>
</Popover>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center mt-6">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages} | {remaining} more employees
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
