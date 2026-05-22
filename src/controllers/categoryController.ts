import type { Request, Response } from "express";
import { prisma } from "../lib/db.js";

const getId = (req: Request) => Number(req.params.id as string);

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(categories);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengambil data kategori",
      error,
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Nama kategori harus diisi",
      });
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal membuat data kategori",
      error,
    });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: getId(req),
      },
    });

    if (!category) {
      return res.status(404).json({
        message: "Kategori tidak ditemukan",
      });
    }

    return res.json(category);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengambil data kategori",
      error,
    });
  }
};

export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Nama kategori harus diisi",
      });
    }

    const category = await prisma.category.update({
      where: {
        id: getId(req),
      },
      data: {
        name,
      },
    });

    return res.json(category);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengupdate data kategori",
      error,
    });
  }
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    await prisma.category.delete({
      where: {
        id: getId(req),
      },
    });

    return res.json({
      message: "Kategori berhasil dihapus",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal menghapus data kategori",
      error,
    });
  }
};