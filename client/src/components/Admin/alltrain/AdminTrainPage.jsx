import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

const TRAINS_PER_PAGE = 10;

export default function AdminTrainPage() {
  const [trains, setTrains] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all trains from the backend
  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const token = localStorage.getItem("accessToken");
  
      if (!token) {
        toast.error("No auth token found");
        return;
      }
        const res = await axios.get(
          "http://127.0.0.1:8000/api/ticketbooking/trains/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTrains(res.data);
      } catch (error) {
        console.error("Error fetching train data:", error);
      }
    };

    fetchTrains();
  }, []);

  const deleteTrain = async (train_id) => {
    try {
      const token = localStorage.getItem("accessToken");
  
      if (!token) {
        toast.error("No auth token found");
        return;
      }
  
      await axios.delete(
        `http://127.0.0.1:8000/api/ticketbooking/trains/${train_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const updatedTrains = trains.filter((t) => t.train_id !== train_id); // <-- FIXED HERE
      setTrains(updatedTrains);
      toast.success("Train deleted successfully");
  
      // Update pagination if needed
      const newFilteredTrains = updatedTrains.filter(
        (train) =>
          train.train_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          train.train_id.includes(searchTerm)
      );
      const totalPagesAfterDeletion = Math.ceil(newFilteredTrains.length / TRAINS_PER_PAGE);
  
      if (currentPage > totalPagesAfterDeletion && currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
  
    } catch (error) {
      toast.error("Failed to delete train");
      console.error("Error deleting train:", error.response?.data || error.message);
    }
  };
  
   
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const filteredTrains = trains.filter(
    (train) =>
      train.train_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      train.train_id.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredTrains.length / TRAINS_PER_PAGE);
  const startIndex = (currentPage - 1) * TRAINS_PER_PAGE;
  const currentTrains = filteredTrains.slice(
    startIndex,
    startIndex + TRAINS_PER_PAGE
  );
  const trainsLeft = filteredTrains.length - startIndex - currentTrains.length;

  return (
    <Card className="p-4 w-full border-0">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4">All Trains</h2>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <Input
            type="text"
            placeholder="Search by train name or number..."
            value={searchTerm}
            onChange={handleSearch}
            className="sm:w-1/2"
          />
          <Button variant="outline" onClick={clearSearch}>
            Clear
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Train Name</TableHead>
              <TableHead>Train Number</TableHead>
              <TableHead>Train Type</TableHead> {/* Changed from Status */}
              <TableHead>Delete</TableHead> {/* Removed Toggle Status column */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTrains.map((train) => (
              <TableRow key={train.id}>
                <TableCell>{train.train_name}</TableCell>
                <TableCell>{train.train_id}</TableCell>
                <TableCell>{train.train_type}</TableCell>{" "}
                {/* Added train_type */}
                <TableCell>
                  <Button
                    onClick={() => deleteTrain(train.train_id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {currentTrains.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No trains found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-3">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <div className="text-gray-600 text-sm flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <span>
              {trainsLeft > 0
                ? `${trainsLeft} train(s) left`
                : "No more trains"}
            </span>
          </div>

          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
