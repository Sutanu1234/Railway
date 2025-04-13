import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import bwipjs from "bwip-js";
import trainIcon from "/train.png"; // Make sure this is valid path or base64

export const generateTicketPDF = async (ticket, type = "ticket") => {
  const doc = new jsPDF();
  const header = type === "ticket" ? "Train Ticket" : "Invoice";

  // If invoice, generate invoice number
  if (type === "invoice") {
    const now = new Date();
    const invoiceNumber = `INV-${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    ticket.invoiceNumber = invoiceNumber;
  }

  // Add train icon and title
  doc.addImage(trainIcon, "PNG", 15, 12, 12, 12);
  doc.setFontSize(18);
  doc.text("Railway Reservation", 30, 20);

  // Generate barcode
  const canvas = document.createElement("canvas");
  try {
    const barcodeText = type === "ticket" ? ticket.pnrNumber : ticket.invoiceNumber;

    await bwipjs.toCanvas(canvas, {
      bcid: "code128",
      text: barcodeText,
      scale: 3,
      height: 10,
      includetext: false,
    });

    const barcodeBase64 = canvas.toDataURL("image/png");
    doc.addImage(barcodeBase64, "PNG", 70, 30, 70, 20);
  } catch (err) {
    console.error("Barcode generation failed:", err);
    doc.setFontSize(12);
    doc.text(
      "Barcode: " + (type === "ticket" ? ticket.pnrNumber : ticket.invoiceNumber),
      105,
      35,
      null,
      null,
      "center"
    );
  }

  // Header
  doc.setFontSize(14);
  doc.text(header, 105, 55, null, null, "center");

  // Build table body
  const body = [
    ...(ticket.invoiceNumber ? [["Invoice Number", ticket.invoiceNumber]] : []),
    ["PNR Number", ticket.pnrNumber],
    ["Train", `${ticket.trainName} (${ticket.trainNumber})`],
    ["From ---- To", `${ticket.source} ---- ${ticket.destination}`],
    ["Date", ticket.dateOfTravel],
    ["Coach", ticket.coachType],
    ["Passengers", ticket.numberOfPassengers],
    [
      "Seats",
      ticket.status.confirmed ? ticket.status.seats.join(", ") : "Not Confirmed",
    ],
    ["Status", ticket.status.confirmed ? "Confirmed" : "Waiting"],
  ];

  autoTable(doc, {
    startY: 60,
    head: [["Field", "Details"]],
    body,
  });

  doc.save(`${type}_${ticket.pnrNumber}.pdf`);
};
