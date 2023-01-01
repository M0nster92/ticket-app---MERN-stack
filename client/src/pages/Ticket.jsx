import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { getTicket, reset } from "../features/ticket/ticketSlice";
import { useAuthStatus } from "../hooks/useAuthStatus";

function Ticket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );

  const { loggedIn, checkingStatus } = useAuthStatus();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(id));
  }, [isError, message, id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!loggedIn) {
    navigate("/login");
    return;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Product: {ticket.product}</h3>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>

        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
    </div>
  );
}

export default Ticket;
