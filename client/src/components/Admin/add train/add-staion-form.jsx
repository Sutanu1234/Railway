import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AddStationsForm() {
  const [trainNumber, setTrainNumber] = useState("");
  const [stations, setStations] = useState([
    { station: "", arrivalTime: "" },
  ]);

  const handleStationChange = (index, field, value) => {
    const updated = [...stations];
    updated[index][field] = value;
    setStations(updated);
  };

  const addStation = () => {
    setStations([...stations, { station: "", arrivalTime: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { trainNumber, stations };
    console.log("Submitted Stations Data:", payload);
    // Add your API call here
  };

  return (
    <Card className="p-4 w-full border-0">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Add Stations to Train</h2>

          <div className="space-y-1">
            <Label htmlFor="trainNumber">Train Number</Label>
            <Input
              id="trainNumber"
              name="trainNumber"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stations</h3>
            {stations.map((station, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg"
              >
                <div className="space-y-2">
                  <Label htmlFor={`station-${index}`}>Station Name</Label>
                  <Input
                    id={`station-${index}`}
                    value={station.station}
                    onChange={(e) =>
                      handleStationChange(index, "station", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`arrival-${index}`}>Arrival Time</Label>
                  <input
                    type="time"
                    id={`arrival-${index}`}
                    value={station.arrivalTime}
                    onChange={(e) =>
                      handleStationChange(index, "arrivalTime", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            ))}
            <Button type="button" onClick={addStation} variant="outline">
              + Add Station
            </Button>
          </div>

          <Button type="submit" className="w-full mt-4">
            Submit Stations
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
