const asyncHandler = require("../utils/asyncHandler");

const User = require("../model/userModel");
const Ticket = require("../model/ticketModel");

const getTickets = asyncHandler(async (req, res) => {
  let tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

const createTicket = asyncHandler(async (req, res) => {
  let { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a production and description");
  }

  let ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
  });

  res.status(201).json(ticket);
});

const getTicket = async (req, res) => {
  let ticket = await Ticket.findOne({ user: req.user._id, _id: req.params.id });

  res.status(200).json(ticket);
};

const deleteTicket = asyncHandler(async (req, res, next) => {
  let ticket = await Ticket.findOne({
    user: req.user._id,
    _id: req.params.id,
  });

  //   console.log("here");

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  await ticket.remove();
  return res.status(200).json(ticket);
});

const updateTicket = async (req, res) => {
  let ticket = await Ticket.findOne({
    user: req.user._id,
    _id: req.params.id,
  });

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
};

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
};
