import { Search, Ticket, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";

function UserHome() {
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
          style={{ backgroundImage: "url('/new.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
          <h3 className="font-bold text-5xl relative z-10">
            Welcome {userName || "Guest"}!
          </h3>
          <p className="font-medium tracking-wider relative z-10">
            Get ready for a smooth journey with us.
          </p>
          <div className="mt-8 flex justify-center">
            <h3 className="text-5xl font-black text-white/40">
              Your Journey Begins Here!
            </h3>
          </div>
        </div>

        {/* Overlapping Features Section */}
        <div className="absolute w-4/5 h-40 bg-white rounded-2xl bottom-[-4vh] flex p-6 shadow-lg">
          <Link
            to="/reservation"
            className="w-1/3 flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <Ticket className="h-10 w-10 text-black" />
            <div>
              <h3 className="text-lg font-bold">Easy Reservation</h3>
              <p className="text-sm text-gray-500">
                Book your tickets in just a few clicks.
              </p>
            </div>
          </Link>

          <Separator orientation="vertical" className="h-full bg-gray-300 mx-4" />

          <Link
            to="/search-train"
            className="w-1/3 flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <Search className="h-10 w-10 text-black" />
            <div>
              <h3 className="text-lg font-bold">Search Trains</h3>
              <p className="text-sm text-gray-500">
                Find the best routes for your journey.
              </p>
            </div>
          </Link>

          <Separator orientation="vertical" className="h-full bg-gray-300 mx-4" />

          <Link
            to="/tickets"
            className="w-1/3 flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition"
          >
            <ClipboardList className="h-10 w-10 text-black" />
            <div>
              <h3 className="text-lg font-bold">Show Tickets</h3>
              <p className="text-sm text-gray-500">
                View all your booked tickets in one place.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-28 text-black text-center py-4">
        <p className="text-sm font-bold">
          &copy; {new Date().getFullYear()} Railway Travels. All Rights Reserved.
        </p>
        <p className="text-xs">Designed for a seamless travel experience.</p>
      </footer>
    </div>
  );
}

export default UserHome;
