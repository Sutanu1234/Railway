import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Train, Users, CalendarDays, IndianRupee } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="pl-4 pr-4 pb-4 space-y-8">
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Train className="text-blue-500" />
            <CardTitle>Trains Running</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">72</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Users className="text-green-500" />
            <CardTitle>Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,240</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <IndianRupee className="text-yellow-500" />
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹5,80,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <CalendarDays className="text-red-500" />
            <CardTitle>Today’s Departures</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">14</p>
          </CardContent>
        </Card>
      </div>

      {/* Train Departures Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Departures</h2>
          <Button>Add New Train</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Train Name</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Seats Left</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Rajdhani Express</TableCell>
              <TableCell>12301</TableCell>
              <TableCell>Howrah</TableCell>
              <TableCell>New Delhi</TableCell>
              <TableCell>16:50</TableCell>
              <TableCell>58</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shatabdi Express</TableCell>
              <TableCell>12009</TableCell>
              <TableCell>Patna</TableCell>
              <TableCell>Ranchi</TableCell>
              <TableCell>09:15</TableCell>
              <TableCell>22</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
