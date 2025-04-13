import { Search, Ticket, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";

export default function EmpHome() {
  const isDutyToday = true;
    const [userName, setUserName] = useState("");
  
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.name) {
        setUserName(storedUser.name);
      }
    }, []);
  return (
    <div className="pl-4 pr-4 pb-4">
      <div className="w-full h-110 relative flex flex-col items-center justify-center">
        {/* Background Image with Overlay */}
        <div
          className="w-full top-0 h-96 overflow-hidden rounded-2xl absolute bg-cover bg-center text-white p-8"
          style={{ backgroundImage: "url('/emphome.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
          <h3 className="font-bold text-5xl relative z-10">Welcome {userName || "Guest"}!</h3>
          <p className="font-medium tracking-wider relative z-10">
            Manage your daily duties, passenger records, and train schedules
            seamlessly..
          </p>
          <div className="mt-8 flex justify-center">
            <h3 className="text-5xl font-black text-white/340">
              On Track with Excellence — Welcome TTE!
            </h3>
          </div>
        </div>

        {/* Overlapping Features Section - Today's Duty Info */}
        <div className="absolute w-4/5 h-40 bg-white rounded-2xl bottom-[-4vh] flex p-6 shadow-lg justify-center items-center">
          {isDutyToday ? ( // replace `true` with condition to check if duty exists today
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 text-black">
                Today's Duty
              </h3>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Train:</span> Rajdhani Express
                (12301)
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Departure:</span> 16:50 from
                Howrah Jn
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Report To Office:</span> 15:00
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-bold text-black">No Duty Today</h3>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-28 text-black text-center py-4">
        <p className="text-sm font-bold">
          &copy; {new Date().getFullYear()} Railway Travels. All Rights
          Reserved.
        </p>
        <p className="text-xs">Designed for a seamless travel experience.</p>
      </footer>
    </div>
  );
}
