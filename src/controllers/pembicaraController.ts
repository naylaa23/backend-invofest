import type { Request, Response } from "express";
import { prisma } from "../lib/db.js";

const getId = (req: Request) => Number(req.params.id as string);

export const getAllPembicara = async (req: Request, res: Response) => {
  const pembicara = await prisma.pembicara.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(pembicara);
};

export const createPembicara = async (req: Request, res: Response) => {
  const { name, role, image } = req.body;

  if (!name || !role || !image) {
    return res.status(400).json({ message: "Nama, role, dan image harus diisi" });
  }

  const pembicara = await prisma.pembicara.create({
    data: { name, role, image },
  });

  res.status(201).json(pembicara);
};

export const getPembicaraById = async (req: Request, res: Response) => {
  const pembicara = await prisma.pembicara.findUnique({
    where: { id: getId(req) },
  });

  if (!pembicara) {
    return res.status(404).json({ message: "Pembicara tidak ditemukan" });
  }

  res.json(pembicara);
};

export const updatePembicaraById = async (req: Request, res: Response) => {
  const { name, role, image } = req.body;

  const pembicara = await prisma.pembicara.update({
    where: { id: getId(req) },
    data: { name, role, image },
  });

  res.json(pembicara);
};

export const deletePembicaraById = async (req: Request, res: Response) => {
  await prisma.pembicara.delete({
    where: { id: getId(req) },
  });

  res.json({ message: "Pembicara berhasil dihapus" });
};