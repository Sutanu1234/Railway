"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ticket, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function BookTicket({ train }) {
  const [date, setDate] = useState();
  const [passengers, setPassengers] = useState(1);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const [form, setForm] = useState({
    trainName: train.name || "",
    trainNumber: train.number || "",
    source: "",
    destination: "",
    passengerName: "",
    passengerPhone: "",
  });

  useEffect(() => {
    if (selectedCoach) {
      setTotalPrice(selectedCoach.price * passengers);
    }
  }, [selectedCoach, passengers]);

  const handlePassengerChange = (e) => {
    const value = parseInt(e.target.value);
    setPassengers(value);
  };

  const handleCoachSelect = (coach) => {
    setSelectedCoach(coach);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    alert(
      `Booked ${passengers} seat(s) for ${form.passengerName} on ${form.trainName} (${selectedCoach?.type}) for ₹${totalPrice}`
    );
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button className="w-full bg-green-400 hover:bg-green-500 font-semibold text-md cursor-pointer">
          <Ticket /> Book Ticket
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="w-full rounded-xl bg-white flex flex-col gap-4">
          <p className="text-xl font-bold text-gray-700 mb-2">Book Ticket</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <Label>Train Name</Label>
              <Input value={form.trainName} readOnly />
            </div>
            <div className="flex flex-col space-y-1">
              <Label>Train Number</Label>
              <Input value={form.trainNumber} readOnly />
            </div>
            <div className="flex flex-col space-y-1">
              <Label>Source</Label>
              <Input
                name="source"
                value={form.source}
                onChange={handleChange}
                placeholder="Enter source station"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label>Destination</Label>
              <Input
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder="Enter destination station"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <Label>Date of Travel</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    {date ? format(date, "PPP") : "Select Date"}{" "}
                    <CalendarIcon className="ml-auto h-4 w-4" />
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

            <div className="flex flex-col space-y-1">
              <Label>Number of Passengers</Label>
              <Input
                type="number"
                min="1"
                value={passengers}
                onChange={handlePassengerChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <Label>Passenger Name</Label>
              <Input
                name="passengerName"
                value={form.passengerName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label>Passenger Phone No.</Label>
              <Input
                name="passengerPhone"
                value={form.passengerPhone}
                onChange={handleChange}
                placeholder="Enter phone number"
                type="tel"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <Label>Select Coach</Label>
            <RadioGroup className="mt-2 flex flex-wrap gap-4">
              {train.coaches.map((coach) => (
                <div key={coach.type}>
                  <RadioGroupItem
                    value={coach.type}
                    id={coach.type}
                    checked={selectedCoach?.type === coach.type}
                    onClick={() => handleCoachSelect(coach)}
                  />
                  <Label htmlFor={coach.type} className="ml-2">
                    {coach.type} - ₹{coach.price}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {selectedCoach && (
            <div className="text-md text-green-600 font-semibold">
              Total Price: ₹{totalPrice}
            </div>
          )}

          <Button
            className="w-full bg-green-500 hover:bg-green-600"
            onClick={handleSubmit}
            disabled={
              !selectedCoach ||
              !date ||
              !form.source ||
              !form.destination ||
              !form.passengerName ||
              !form.passengerPhone
            }
          >
            <Ticket className="mr-2" /> Confirm Booking
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
