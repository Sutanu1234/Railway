export const trainData = [
  {
    name: "Rajdhani Express",
    number: "12301",
    runsOn: "Su Mo Tu We Th Fr Sa",
    status: true, // Running
    source: { station: "Howrah Jn", time: "16:50" },
    destination: { station: "New Delhi", time: "10:05" },
    coaches: [
      { type: "AC 1 Tier", seats: 36, price: 4000 },
      { type: "AC 2 Tier", seats: 52, price: 2500 },
      { type: "AC 3 Tier", seats: 72, price: 1800 },
      { type: "Sleeper", seats: 120, price: 750 },
    ],
  },
  {
    name: "Shatabdi Express",
    number: "12002",
    runsOn: "Su Mo Tu We Th Fr Sa",
    status: true, // Running
    source: { station: "New Delhi", time: "06:00" },
    destination: { station: "Bhopal Jn", time: "14:30" },
    coaches: [
      { type: "Executive Class", seats: 24, price: 2200 },
      { type: "AC Chair Car", seats: 128, price: 1200 },
    ],
  },
  {
    name: "Duronto Express",
    number: "12245",
    runsOn: "Mo We Fr",
    status: true, // Running
    source: { station: "Mumbai CST", time: "23:00" },
    destination: { station: "Howrah Jn", time: "17:15" },
    coaches: [
      { type: "AC 1 Tier", seats: 30, price: 4200 },
      { type: "AC 2 Tier", seats: 50, price: 2800 },
      { type: "AC 3 Tier", seats: 70, price: 1900 },
    ],
  },
  {
    name: "Garib Rath Express",
    number: "12910",
    runsOn: "Tu Th Sa",
    status: true, // Running
    source: { station: "Delhi Sarai Rohilla", time: "19:10" },
    destination: { station: "Mumbai Bandra", time: "11:30" },
    coaches: [{ type: "AC 3 Tier", seats: 80, price: 1200 }],
  },
  {
    name: "Jammu Tawi Express",
    number: "13151",
    runsOn: "Mo We Fr",
    status: false, // Cancelled
    source: { station: "Kolkata", time: "11:45" },
    destination: { station: "Jammu Tawi", time: "22:30" },
    coaches: [
      { type: "AC 2 Tier", seats: 50, price: 2200 },
      { type: "AC 3 Tier", seats: 60, price: 1600 },
      { type: "Sleeper", seats: 100, price: 650 },
    ],
  },
  {
    name: "Kolkata Mail",
    number: "12322",
    runsOn: "Su Mo Tu We",
    status: true, // Running
    source: { station: "Mumbai CST", time: "20:30" },
    destination: { station: "Howrah Jn", time: "15:10" },
    coaches: [
      { type: "AC 1 Tier", seats: 25, price: 3800 },
      { type: "AC 2 Tier", seats: 40, price: 2200 },
      { type: "AC 3 Tier", seats: 65, price: 1500 },
      { type: "Sleeper", seats: 110, price: 600 },
    ],
  },
  {
    name: "Gatimaan Express",
    number: "12050",
    runsOn: "Su Mo Tu We Th Fr Sa",
    status: true, // Running
    source: { station: "New Delhi", time: "08:10" },
    destination: { station: "Jhansi Jn", time: "12:35" },
    coaches: [
      { type: "Executive Class", seats: 30, price: 2000 },
      { type: "AC Chair Car", seats: 140, price: 1100 },
    ],
  },
  {
    name: "Humsafar Express",
    number: "12594",
    runsOn: "Mo We Fr",
    status: true, // Running
    source: { station: "Delhi Anand Vihar", time: "21:30" },
    destination: { station: "Gorakhpur Jn", time: "10:00" },
    coaches: [{ type: "AC 3 Tier", seats: 100, price: 1700 }],
  },
  {
    name: "Tejas Express",
    number: "22119",
    runsOn: "Su Mo Tu We Th Fr Sa",
    status: true, // Running
    source: { station: "Mumbai CSMT", time: "06:40" },
    destination: { station: "Karmali", time: "15:00" },
    coaches: [
      { type: "Executive Class", seats: 30, price: 2600 },
      { type: "AC Chair Car", seats: 120, price: 1400 },
    ],
  },
  {
    name: "Vande Bharat Express",
    number: "22435",
    runsOn: "Su Mo Tu We Th Fr Sa",
    status: false, // Running
    source: { station: "Varanasi Jn", time: "06:00" },
    destination: { station: "New Delhi", time: "14:00" },
    coaches: [
      { type: "Executive Class", seats: 35, price: 3200 },
      { type: "AC Chair Car", seats: 140, price: 1600 },
    ],
  },
];
