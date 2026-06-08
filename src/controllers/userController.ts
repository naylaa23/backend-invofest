import type { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import bcrypt from "bcrypt";

const getId = (req: Request) => Number(req.params.id as string);

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password, foto } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username dan password harus diisi",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      foto,
    },
  });
  res.status(201).json(user);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: getId(req) },
  });
  if (!user) {
    return res.status(404).json({
      message: "User tidak ditemukan",
    });
  }
  res.json(user);
};

export const updateUserById = async (req: Request, res: Response) => {
  const { username, password, foto } = req.body;
  const user = await prisma.user.update({
    where: { id: getId(req) },
    data: {
      username,
      password,
      foto,
    },
  });
  res.json(user);
};

export const deleteUserById = async (req: Request, res: Response) => {
  await prisma.user.delete({
    where: { id: getId(req) },
  });
  res.json({
    message: "User berhasil dihapus",
  });
};