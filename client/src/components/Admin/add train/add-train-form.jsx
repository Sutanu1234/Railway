"use client";
import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Train } from "lucide-react";
import { toast } from "sonner";

const BASE_URL = "http://localhost:8000/api/ticketbooking";

const trainTypes = ["Mail", "Express", "Passenger"];
const coachTypes = ["AC", "Sleeper"];
const seatTypes = ["W", "M", "S"];

export default function AddTrainForm() {
  const [train, setTrain] = useState({
    train_id: "",
    train_name: "",
    train_type: "",
  });

  const [coach, setCoach] = useState({
    coach_id: "",
    train_id: "",
    coach_type: "",
  });

  const [seat, setSeat] = useState({
    seat_id: "",
    coach_id: "",
    seat_type: "",
  });

  const handleTrainSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/trains/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // or "credentials: include" for session
        },
        body: JSON.stringify(train),
      });
  
      if (res.ok) {
        toast.success("Train added successfully!");
        setTrain({ train_id: "", train_name: "", train_type: "" });
      } else {
        const errorData = await res.json();
        console.error("Server error:", errorData);
        toast.error("Failed to add train");
      }
    } catch (error) {
      console.error("Error adding train:", error);
      toast.error("Network error");
    }
  };

  const handleCoachSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/coaches/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          coach_id: coach.coach_id,
          train: coach.train_id,
          coach_type: coach.coach_type,
        }),
      });
  
      if (res.ok) {
        toast.success("Coach added successfully!");
        setCoach({
          coach_id: "",
          train_id: "",
          coach_type: "",
        });
      } else {
        const errorData = await res.json();
        console.error("Server error:", errorData);
        toast.error("Failed to add coach");
      }
    } catch (error) {
      console.error("Error adding coach:", error);
      toast.error("Network error");
    }
  };
  
  const handleSeatSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/seats/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          ...seat,
          coach: seat.coach_id,
        }),
      });
  
      if (res.ok) {
        toast.success("Seat added successfully!");
        setSeat({
          seat_id: "",
          coach_id: "",
          seat_type: "",
        });
      } else {
        const errorData = await res.json();
        console.error("Server error:", errorData);
        toast.error("Failed to add seat");
      }
    } catch (error) {
      console.error("Error adding seat:", error);
      toast.error("Network error");
    }
  };
  

  return (
    <Card className="p-4 w-full border-0">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-6 flex gap-2 items-center">
          <Train /> Add Train Configuration
        </h2>

        {/* Train Form */}
        <form onSubmit={handleTrainSubmit} className="space-y-4 mb-10 w-full">
          <h3 className="text-lg font-semibold">Train Info</h3>
          <div className="flex items-end gap-4 w-full">
            <div className="flex flex-col w-full">
              <Label className="mb-2">Train ID</Label>
              <Input
                value={train.train_id}
                onChange={(e) =>
                  setTrain({ ...train, train_id: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <Label className="mb-2">Train Name</Label>
              <Input
                value={train.train_name}
                onChange={(e) =>
                  setTrain({ ...train, train_name: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <Label className="mb-2">Train Type</Label>
              <Select
                value={train.train_type}
                onValueChange={(val) =>
                  setTrain({ ...train, train_type: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {trainTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="h-10 mt-6">
              Submit Train
            </Button>
          </div>
        </form>

        {/* Coach Form */}
        <form onSubmit={handleCoachSubmit} className="space-y-4 mb-10">
          <h3 className="text-lg font-semibold">Coach Info</h3>
          <div className="flex items-end gap-4 w-full">
            <div className="flex flex-col w-full">
              <Label className="mb-2">Coach ID</Label>
              <Input
                value={coach.coach_id}
                onChange={(e) =>
                  setCoach({ ...coach, coach_id: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <Label className="mb-2">Train ID</Label>
              <Input
                value={coach.train_id}
                onChange={(e) =>
                  setCoach({ ...coach, train_id: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <Label className="mb-2">Coach Type</Label>
              <Select
                value={coach.coach_type}
                onValueChange={(val) =>
                  setCoach({ ...coach, coach_type: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {coachTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="h-10 mt-6">
              Submit Coach
            </Button>
          </div>
        </form>

        {/* Seat Form */}
        <form onSubmit={handleSeatSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold">Seat Info</h3>
          <div className="flex flex-wrap items-end gap-4 w-full">
            <div className="flex flex-col w-full sm:w-[23%]">
              <Label className="mb-2">Seat ID</Label>
              <Input
                value={seat.seat_id}
                onChange={(e) =>
                  setSeat({ ...seat, seat_id: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col w-full sm:w-[23%]">
              <Label className="mb-2">Coach ID</Label>
              <Input
                value={seat.coach_id}
                onChange={(e) =>
                  setSeat({ ...seat, coach_id: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col w-full sm:w-[23%]">
              <Label className="mb-2">Seat Type</Label>
              <Select
                value={seat.seat_type}
                onValueChange={(val) =>
                  setSeat({ ...seat, seat_type: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {seatTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* <div className="flex flex-col w-full sm:w-[23%]">
              <Label className="mb-2">Seat Number</Label>
              <Input
                type="number"
                value={seat.seat_number}
                onChange={(e) =>
                  setSeat({ ...seat, seat_number: e.target.value })
                }
                required
              />
            </div> */}
            <Button type="submit" className="h-10">
              Submit Seat
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
