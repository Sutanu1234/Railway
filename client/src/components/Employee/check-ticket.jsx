"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { passengerData } from "./passengerData.js";

const RECORDS_PER_PAGE = 10;

function CheckTicket() {
  const [bookings, setBookings] = useState(passengerData);
  const [searchPNR, setSearchPNR] = useState("");
  const [attendance, setAttendance] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBookings = bookings.filter((booking) =>
    booking.pnr.toLowerCase().includes(searchPNR.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBookings.length / RECORDS_PER_PAGE);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * RECORDS_PER_PAGE,
    currentPage * RECORDS_PER_PAGE
  );

  const handleCheck = (pnr) => {
    setAttendance((prev) => ({
      ...prev,
      [pnr]: !prev[pnr],
    }));
  };

  const handleSubmit = () => {
    const attendedPNRs = Object.entries(attendance)
      .filter(([pnr, status]) => status)
      .map(([pnr]) => pnr);

    alert(`Checked-in PNRs: ${attendedPNRs.join(", ")}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Today's Booking - Assigned Train
      </h2>

      <div className="mb-6 flex items-end gap-4">
        <div className="flex-1">
          <Label htmlFor="pnrSearch" className="text-lg font-medium">
            Search by PNR
          </Label>
          <Input
            id="pnrSearch"
            placeholder="Enter PNR number"
            value={searchPNR}
            onChange={(e) => setSearchPNR(e.target.value)}
            className="mt-2 text-base"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setSearchPNR("")}
          className="h-full mt-6"
        >
          Clear
        </Button>
      </div>

      <Table className="w-full">
        <TableCaption className="text-lg text-gray-600">
          Passenger bookings for today
        </TableCaption>
        <TableHeader>
          <TableRow className="text-lg">
            <TableHead className="text-base">Check</TableHead>
            <TableHead className="text-base">PNR No</TableHead>
            <TableHead className="text-base">Passengers</TableHead>
            <TableHead className="text-base">Seat No(s)</TableHead>
            <TableHead className="text-base">Coach</TableHead>
            <TableHead className="text-base">Source</TableHead>
            <TableHead className="text-base">Destination</TableHead>
            <TableHead className="text-base">Contact No</TableHead>
            <TableHead className="text-base">Booked By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedBookings.map((booking) => (
            <TableRow key={booking.pnr} className="text-[16px]">
              <TableCell>
                <input
                  type="checkbox"
                  checked={attendance[booking.pnr] || false}
                  onChange={() => handleCheck(booking.pnr)}
                  className="w-5 h-5 accent-green-600"
                />
              </TableCell>
              <TableCell className="font-semibold">{booking.pnr}</TableCell>
              <TableCell>{booking.passengers.length}</TableCell>
              <TableCell>
                {booking.passengers.map((p) => p.seat).join(", ")}
              </TableCell>
              <TableCell>{booking.coach}</TableCell>
              <TableCell>{booking.source}</TableCell>
              <TableCell>{booking.destination}</TableCell>
              <TableCell>{booking.contact || "N/A"}</TableCell>{" "}
              {/* 👈 Added Contact */}
              <TableCell>{booking.bookedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={10} className="text-right w-full">
              <Button
                className="bg-green-600 hover:bg-green-700 mr-4"
                onClick={handleSubmit}
              >
                Submit Attendance
              </Button>

              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="mr-2"
              >
                Previous
              </Button>

              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default CheckTicket;
