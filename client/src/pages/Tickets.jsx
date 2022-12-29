import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getTickets, reset } from "../features/ticket/ticketSlice";
import { useAuthStatus } from "../hooks/useAuthStatus";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";

function Tickets() {
  const { tickets, isLoading } = useSelector((state) => state.ticket);
  const { loggedIn, checkingStatus } = useAuthStatus();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTickets());
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!loggedIn) {
    navigate("/login");
    return;
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}

export default Tickets;
