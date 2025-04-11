import React from "react";
import { tickets } from "./tickets";
import { Separator } from "@/components/ui/separator";
import { FileText, Trash2, Download } from "lucide-react";
import { generateTicketPDF } from "./generateTicketPDF";

function ShowTickets() {
  const currentTickets = tickets.filter((ticket) => ticket.status.live);
  const pastTickets = tickets.filter((ticket) => !ticket.status.live);

  return (
    <div className="pl-4 pr-4 pb-4">
      {/* Current Tickets Section */}
      <div className="mt-6">
        <p className="text-xl font-bold text-gray-600 mb-4">Current Tickets</p>
        {currentTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTickets.map((ticket, index) => (
              <div
                key={index}
                className="w-full rounded-2xl shadow-md p-4 border bg-white flex flex-col gap-4"
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-700">
                    {ticket.trainName} ({ticket.trainNumber})
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    PNR: {ticket.pnrNumber}
                  </p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p className="text-lg font-bold text-gray-800">
                    {ticket.source} → {ticket.destination}
                  </p>
                  <p className="text-md text-gray-500">{ticket.dateOfTravel}</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p className="text-md text-gray-600">
                    <strong>Coach:</strong> {ticket.coachType}
                  </p>
                  <p
                    className={`text-md font-medium ${
                      ticket.status.confirmed
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {ticket.status.confirmed ? "Confirmed" : "Waiting"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-md text-gray-600">
                    <strong>Passengers:</strong> {ticket.numberOfPassengers}
                  </p>
                  <p className="text-md text-gray-600">
                    <strong>Seats:</strong>{" "}
                    {ticket.status.confirmed
                      ? ticket.status.seats.join(", ")
                      : "No Seat"}
                  </p>
                </div>

                {/* Buttons for Current Tickets */}
                <div className="flex gap-2">
                  <button
                    className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                    onClick={() => generateTicketPDF(ticket, "ticket")}
                  >
                    <Download className="size-5" /> Download Ticket
                  </button>
                  <button className="w-full bg-red-400 text-white py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                    <Trash2 className="size-5" /> Cancel Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-md text-gray-500">No Current Tickets</p>
        )}
      </div>

      {/* Past Tickets Section */}
      <div className="mt-10">
        <p className="text-xl font-bold text-gray-600 mb-4">Past Tickets</p>
        {pastTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastTickets.map((ticket, index) => (
              <div
                key={index}
                className="w-full rounded-2xl shadow-md p-4 border bg-gray-100 flex flex-col gap-4"
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-700">
                    {ticket.trainName} ({ticket.trainNumber})
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    PNR: {ticket.pnrNumber}
                  </p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p className="text-lg font-bold text-gray-800">
                    {ticket.source} → {ticket.destination}
                  </p>
                  <p className="text-md text-gray-500">{ticket.dateOfTravel}</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p className="text-md text-gray-600">
                    <strong>Coach:</strong> {ticket.coachType}
                  </p>
                  <p className="text-md text-gray-500">Completed</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-md text-gray-600">
                    <strong>Passengers:</strong> {ticket.numberOfPassengers}
                  </p>
                  <p className="text-md text-gray-600">
                    <strong>Seats:</strong>{" "}
                    {ticket.status.confirmed
                      ? ticket.status.seats.join(", ")
                      : "No Seat"}
                  </p>
                </div>

                {/* Button for Past Tickets */}
                <button
                  className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => generateTicketPDF(ticket, "invoice")}
                >
                  <FileText className="size-5" /> Download Invoice
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-md text-gray-500">No Past Tickets</p>
        )}
      </div>
    </div>
  );
}

export default ShowTickets;
