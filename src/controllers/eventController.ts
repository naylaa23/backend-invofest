import type { Request, Response } from "express";
import { prisma } from "../lib/db.js";

const getId = (req: Request) => Number(req.params.id as string);

export const getAllEvents = async (req: Request, res: Response) => {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(events);
};

export const createEvent = async (req: Request, res: Response) => {
  const { name, categoryId, location, dateEvent, description } = req.body;

  if (!name || !categoryId || !location || !dateEvent || !description) {
    return res.status(400).json({ message: "Semua data harus diisi" });
  }

  const event = await prisma.event.create({
    data: {
      name,
      categoryId: String(categoryId),
      location,
      dateEvent: new Date(dateEvent),
      description,
    },
  });

  res.status(201).json(event);
};

export const getEventById = async (req: Request, res: Response) => {
  const event = await prisma.event.findUnique({
    where: { id: getId(req) },
  });

  if (!event) {
    return res.status(404).json({ message: "Event tidak ditemukan" });
  }

  res.json(event);
};

export const updateEventById = async (req: Request, res: Response) => {
  const { name, categoryId, location, dateEvent, description } = req.body;

  const event = await prisma.event.update({
    where: { id: getId(req) },
    data: {
      name,
      categoryId: String(categoryId),
      location,
      dateEvent: new Date(dateEvent),
      description,
    },
  });

  res.json(event);
};

export const deleteEventById = async (req: Request, res: Response) => {
  await prisma.event.delete({
    where: { id: getId(req) },
  });

  res.json({ message: "Event berhasil dihapus" });
};