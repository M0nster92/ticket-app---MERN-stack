import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { getTicket, closeTicket } from "../features/ticket/ticketSlice";
import { getNotes, createNote } from "../features/note/noteSlice";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { FaPlus } from "react-icons/fa";

const customStyle = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function Ticket() {
  const [modalOpen, setModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );
  const { notes, isLoading: notesLoading } = useSelector((state) => state.note);

  const { loggedIn, checkingStatus } = useAuthStatus();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(id));
    dispatch(getNotes(id));
  }, [isError, message, id]);

  if (isLoading || notesLoading) {
    return <Spinner />;
  }

  if (!loggedIn) {
    navigate("/login");
    return;
  }

  const onTicketClose = () => {
    dispatch(closeTicket(id));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const noteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, id }));
    closeModal();
  };

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

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyle}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          x
        </button>
        <form onSubmit={noteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="note"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {ticket.status !== "closed" && (
        <button className="btn" onClick={openModal}>
          <FaPlus /> Add Note
        </button>
      )}

      {notes.map((note) => (
        <div key={note._id}>
          <h4>Notes</h4>
          <div className="note-section">
            <div className="message">Note: {note.text}</div>
            <div className="date">
              {new Date(note.createdAt).toLocaleString("en-US")}
            </div>
          </div>
        </div>
      ))}

      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Close
        </button>
      )}
    </div>
  );
}

export default Ticket;
