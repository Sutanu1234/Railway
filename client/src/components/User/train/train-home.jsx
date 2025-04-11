"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  CalendarIcon,
  Search,
  Armchair,
  IndianRupee,
  Route,
  TrainFront,
  Ticket,
} from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

import { trainData } from "./traindata.js";
import { trainStops } from "./trainStops.js";
import { BookTicket } from "./book/ticket-book-form.jsx";

function TrainHome() {
  const [date, setDate] = useState(null);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [filteredTrains, setFilteredTrains] = useState(trainData);

  // Function to filter trains by source, destination, and selected date (day filter)
  const handleSearchByRoute = () => {
    if (!source || !destination || !date) return;
    const selectedDay = format(date, "EEEEEE"); // Extract first letter of the day (S, M, T, etc.)
    const filtered = trainData.filter(
      (train) =>
        train.source.station.toLowerCase() === source.toLowerCase() &&
        train.destination.station.toLowerCase() === destination.toLowerCase() &&
        train.runsOn.includes(selectedDay)
    );
    setFilteredTrains(filtered);
  };

  // Function to filter trains by train number
  const handleSearchByNumber = () => {
    if (!trainNumber) return;
    const filtered = trainData.filter((train) => train.number === trainNumber);
    setFilteredTrains(filtered);
  };

  return (
    <div className="pl-4 pr-4">
      <div className="w-full h-36 flex flex-col justify-around items-start p-4 shadow-md rounded-2xl border-1 gap-4">
        <div className="flex gap-2 justify-center items-center">
          <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-sidebar-primary text-sidebar-primary-foreground">
            <TrainFront />
          </div>
          <h3 className="text-xl font-semibold">Find Your Train</h3>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex gap-4 items-end">
            <div className="w-full h-full flex gap-4 justify-center items-center">
              {/* input */}
              <div className="flex gap-2 justify-center items-center">
                <div className="flex flex-col gap-2">
                  <p className="text-gray-400 text-sm">Source</p>
                  <Input
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-gray-400 text-sm">Destination</p>
                  <Input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>
              {/* calender */}
              <div className="flex flex-col gap-2">
                <p className="text-gray-400 text-sm">Date</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-48 flex justify-between items-center px-3 py-2 text-left text-sm font-normal"
                    >
                      {date ? format(date, "PPP") : "Select a date"}
                      <CalendarIcon className="ml-2 h-4 w-4 text-gray-500" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <Button onClick={handleSearchByRoute}>
                <Search /> Search
              </Button>
            </div>
          </div>
          <div className="flex gap-4 items-end">
            <div className="w-full h-full flex gap-4 justify-center items-center">
              {/* input */}
              <div className="flex flex-col gap-2">
                <p className="text-gray-400 text-sm">Train Number</p>
                <Input
                  value={trainNumber}
                  onChange={(e) => setTrainNumber(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Button onClick={handleSearchByNumber}>
                <Search /> Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* result */}

      <div className="mt-8 h-full w-full">
        <p className="text-xl font-semibold mb-4">Search Result</p>
        <div
          className={`${
            filteredTrains.length > 0 ? "grid wrap grid-cols-2 gap-4" : ""
          } h-full w-full`}
        >
          {filteredTrains.length > 0 ? (
            filteredTrains.map((train) => {
              const trainStopsData =
                trainStops.find((stops) => stops.trainNumber === train.number)
                  ?.stops || [];
              return (
                <div
                  key={train.number}
                  className="w-full rounded-2xl shadow-sm p-4 flex flex-col gap-6 border"
                >
                  <div className="flex h-6 items-center gap-4">
                    <p className="text-lg font-medium text-gray-600">
                      {train.name} ({train.number})
                    </p>
                    <Separator orientation="vertical" />
                    <p className="text-md font-medium text-gray-400">
                      Runs On: {train.runsOn}
                    </p>
                    <Separator orientation="vertical" />
                    <p
                      className={`text-lg font-medium ${
                        train.status ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {train.status ? "Running" : "Cancelled"}
                    </p>
                  </div>
                  <div className="flex items-center w-full gap-4 justify-center">
                    <div className="flex items-center w-full h-6 gap-4">
                      <p className="text-2xl font-bold text-gray-800">
                        {train.source.time}
                      </p>
                      <Separator orientation="vertical" />
                      <p className="text-lg font-bold text-gray-400 truncate max-w-1/2">
                        {train.source.station}
                      </p>
                    </div>
                    <Separator className="max-w-16" />
                    <div className="flex items-center w-full h-6 gap-4 justify-end">
                      <p className="text-2xl font-bold text-gray-800">
                        {train.destination.time}
                      </p>
                      <Separator orientation="vertical" />
                      <p className="text-lg font-bold text-gray-400 truncate max-w-1/2">
                        {train.destination.station}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-2 items-center w-full">
                      {train.coaches.map((coach) => (
                        <div
                          key={coach.type}
                          className="bg-gray-50 w-full h-full rounded-lg border flex flex-col items-center p-2"
                        >
                          <div className="flex items-center">
                            <p className="text-lg font-semibold text-gray-600">
                              {coach.type}
                            </p>
                            <Armchair className="size-4 ml-2" />
                            <p className="text-md font-normal text-gray-400 ml-1">
                              {coach.seats}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <IndianRupee className="size-5" />
                            <p className="text-2xl font-bold">{coach.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 wrap">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="w-full cursor-pointer">
                          <Route /> Show Routes
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-4 w-64">
                        <p className="text-lg font-semibold mb-2">
                          Train Stops
                        </p>
                        <ul className="list-disc pl-4">
                          {trainStopsData.length > 0 ? (
                            trainStopsData.map((stop, index) => (
                              <li key={index} className="text-gray-600">
                                <div className="flex gap-2 justify-between">
                                  <p className="truncate max-w-3/4">
                                    {stop.station}
                                  </p>
                                  <p>{stop.time}</p>
                                </div>
                              </li>
                            ))
                          ) : (
                            <p className="text-gray-400">No stops available</p>
                          )}
                        </ul>
                      </PopoverContent>
                    </Popover>
                    {train.status ? (
                      // <Button className={`w-full cursor-pointer bg-green-400 hover:bg-green-600`}>
                      //   <Ticket /> Book Ticket
                      // </Button>
                      <BookTicket train={train} />
                    ) : (
                      <Button
                        className={`w-full cursor-pointer bg-green-400 hover:bg-green-600`}
                        disabled
                      >
                        <Ticket /> Book Ticket
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-xl font-bold text-gray-400">
                😔 No Train Is Available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrainHome;
