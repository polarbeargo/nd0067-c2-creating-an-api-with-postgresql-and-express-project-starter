import { verifyAuthToken } from "../middleware";
import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user";

const userModel = new UserModel();

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.index();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.show(Number(req.params.id));
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const newUser = await userModel.create(user);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const updatedUser = await userModel.update(Number(req.params.id), user);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userModel.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userModel.authenticate(req.params.id, req.body.password);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const userRouteHandler = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.put("/users/:id", verifyAuthToken, update);
  app.get("/users/:id/authenticate", authenticate);
  app.delete("/users/d/:id", verifyAuthToken, destroy);
};

export default userRouteHandler;
