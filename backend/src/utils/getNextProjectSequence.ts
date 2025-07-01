import { Counter } from "../models/counterModel.ts";
import { Types } from "mongoose";

export const getNextProjectSequence = async (projectId: Types.ObjectId, module: string): Promise<number> => {
  const counter = await Counter.findOneAndUpdate(
    { projectId, module },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return counter.value;
};