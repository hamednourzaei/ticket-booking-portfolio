import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TicketItem from "./TicketItem";


const TicketGrid = ({ tickets, handleEditTicket, handleDeleteTicket, handleAddToCart }) => {
  if (!Array.isArray(tickets) || tickets.length === 0) {
    return <div>هیچ بلیطی یافت نشد.</div>;
  }

  const handleAddWithSwal = (ticket) => {
    handleAddToCart(ticket);
    Swal.fire({
      title: "موفقیت‌آمیز!",
      text: `بلیط "${ticket.event}" به سبد خرید اضافه شد.`,
      icon: "success",
      confirmButtonText: "باشه",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {tickets.map((ticket) => (
        <TicketItem
          key={ticket.id}
          ticket={ticket}
          handleEditTicket={handleEditTicket}
          handleDeleteTicket={handleDeleteTicket}
        >
          <div className="space-y-4">
            <img src={ticket.image} alt={ticket.event} className="w-full h-40 object-cover rounded" />
            <h3 className="text-xl font-semibold">{ticket.event}</h3>
            <p className="text-gray-600">{ticket.date}</p>
            <p className="text-gray-600">{ticket.location}</p>
            <p className="text-gray-800 font-bold">{ticket.price} تومان</p>
            <button
              onClick={() => handleAddWithSwal(ticket)}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
            >
              افزودن به سبد خرید
            </button>
          </div>
        </TicketItem>
      ))}
    </div>
  );
};


export default TicketGrid;
