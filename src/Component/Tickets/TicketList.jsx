import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TicketList = ({ handleAddToCart }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          "https://hamedmkm.github.io/API-booking-Ticket/db.json"
        );
        setTickets(response.data?.tickets || []); // بررسی وجود داده‌ها
      } catch (err) {
        setError("خطا در دریافت بلیط‌ها");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleAddWithSwal = (ticket) => {
    handleAddToCart(ticket);
    Swal.fire({
      title: "موفقیت‌آمیز!",
      text: `بلیط "${ticket.event}" به سبد خرید اضافه شد.`,
      icon: "success",
      confirmButtonText: "باشه",
    });
  };

  if (loading) return <div className="p-4">در حال بارگذاری...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-20">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="border p-4 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          <h3 className="text-xl font-bold">{ticket.event}</h3>
          <img
            src={ticket.image || "default-image.jpg"}
            alt={ticket.event}
            className="w-full h-48 object-cover rounded-md mb-4"
            onError={(e) => (e.target.src = "default-image.jpg")}
          />
          <p>تاریخ: {ticket.date}</p>
          <p>شهر: {ticket.location}</p>
          <p>قیمت: {ticket.price} تومان</p>
          <button
            onClick={() => handleAddWithSwal(ticket)}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            افزودن به سبد خرید
          </button>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
