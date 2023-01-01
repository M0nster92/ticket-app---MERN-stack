const asyncHandler = require("../utils/asyncHandler");
const Note = require("../model/noteModel");
const Ticket = require("../model/ticketModel");

const getNotes = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.params.id });

  if (!ticket) {
    res.status(401);
    throw new Error("No ticket found!");
  }

  const notes = await Note.find({ ticket: req.params.id });

  res.status(200).json(notes);
});

const addNote = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.params.id });

  if (!ticket) {
    res.status(401);
    throw new Error("No ticket found!");
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.id,
    user: req.user._id,
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
