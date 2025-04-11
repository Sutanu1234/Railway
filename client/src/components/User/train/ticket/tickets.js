export const tickets = [
    {
      trainName: "Rajdhani Express",
      trainNumber: "12345",
      pnrNumber: "9876543210",
      dateOfTravel: "2025-04-10",
      source: "New Delhi",
      destination: "Kolkata",
      numberOfPassengers: 2,
      coachType: "AC1",
      status: {
        live: true,
        confirmed: true,
        seats: ["A1-23", "A1-24"],
      },
    },
    {
      trainName: "Duronto Express",
      trainNumber: "67890",
      pnrNumber: "1234567890",
      dateOfTravel: "2025-03-25",
      source: "Mumbai",
      destination: "Chennai",
      numberOfPassengers: 3,
      coachType: "AC2", // Second Class AC
      status: {
        live: false,
        confirmed: true,
        seats: ["B2-45", "B2-46", "B2-47"],
      },
    },
    {
      trainName: "Shatabdi Express",
      trainNumber: "11223",
      pnrNumber: "4561237890",
      dateOfTravel: "2025-04-15",
      source: "Bangalore",
      destination: "Hyderabad",
      numberOfPassengers: 1,
      coachType: "AC3", // Third Class AC
      status: {
        live: true,
        confirmed: false,
        seats: ["No Seat"], // In waiting list
      },
    },
    {
      trainName: "Garib Rath",
      trainNumber: "22456",
      pnrNumber: "7894561230",
      dateOfTravel: "2025-03-05",
      source: "Delhi",
      destination: "Lucknow",
      numberOfPassengers: 4,
      coachType: "Sleeper", // Sleeper class
      status: {
        live: false,
        confirmed: true,
        seats: ["C3-19", "C3-20", "C3-21", "C3-22"],
      },
    },
    {
      trainName: "Express Mail",
      trainNumber: "33221",
      pnrNumber: "7418529630",
      dateOfTravel: "2025-04-20",
      source: "Patna",
      destination: "Varanasi",
      numberOfPassengers: 2,
      coachType: "Sleeper",
      status: {
        live: false,
        confirmed: true,
        seats: ["D5-10", "D5-11"],
      },
    },
  ];
  