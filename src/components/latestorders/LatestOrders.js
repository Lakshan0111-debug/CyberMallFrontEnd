import React from "react";
import "./LatestOrders.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const rows = [
  {
    id: 100,
    customer: "Lee Martin",
    amount: 300,
    date: "27th September",
    time: "18:34"
  },
  {
    id: 99,
    customer: "Lee Martin",
    amount: 300,
    date: "27th September",
    time: "14:34"
  },
  {
    id: 98,
    customer: "Lee Martin",
    amount: 300,
    date: "27th September",
    time: "13:34"
  },
  {
    id: 97,
    customer: "Lee Martin",
    amount: 300,
    date: "26th September",
    time: "13:58"
  },
  {
    id: 96,
    customer: "Lee Martin",
    amount: 300,
    date: "26th September",
    time: "13:34"
  },
];

const LatestOrders = () => {
  return (
    <div className="latestOrders">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableHead">Order ID</TableCell>
              <TableCell className="tableHead">Customer</TableCell>
              <TableCell className="tableHead">Amount (LKR)</TableCell>
              <TableCell className="tableHead">Date</TableCell>
              <TableCell className="tableHead">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">{row.customer}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LatestOrders;