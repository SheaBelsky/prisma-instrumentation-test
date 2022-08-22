import type { Request, Response } from "express";
import prisma from '../client'

export async function getAllUsers(request: Request, response: Response) {
  const results = await prisma.user.findMany();
  return response.json({
    data: results,
    status: 200,
  });
}

export async function createUser(request: Request, response: Response) {
  if (!request.body.firstName) {
    return response.json({
      error: "Please provide a first name",
      status: 500,
    })
  }
  if (!request.body.lastName) {
    return response.json({
      error: "Please provide a first name",
      status: 500,
    })
  }
  if (!Array.isArray(request.body.funFacts)) {
    return response.json({
      error: "Please provide a first name",
      status: 500,
    })
  }
  const createdUser = await prisma.user.create({
    data: {
      firstName: request.body.firstName,
      funFacts: request.body.funFacts,
      lastName: request.body.lastName
    }
  });
  return response.json({
    data: createdUser,
    status: 200,
  })
}