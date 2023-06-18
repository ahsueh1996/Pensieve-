import { Extension, RuntimeConnector } from "@dataverse/runtime-connector";
import { createContext } from "react";
import { Model, Output } from "../types";
import { getIndexFilesModel, getOutput, getPostModel, getEventModel, getPhotoModel } from "../utils/model";

interface ContextType {
  runtimeConnector: RuntimeConnector;
  appVersion: string;
  postModel: Model;
  eventModel: Model;
  photoModel: Model;
  indexFilesModel: Model;
  output: Output;
}

export const Context = createContext<ContextType>({} as ContextType);

const runtimeConnector = new RuntimeConnector(Extension);
const appVersion = "0.0.1";
const postModel = getPostModel();
const eventModel = getEventModel();
const photoModel = getPhotoModel();
const indexFilesModel = getIndexFilesModel();
const output = getOutput();

export const contextStore = {
  runtimeConnector,
  appVersion,
  postModel,
  eventModel,
  photoModel,
  indexFilesModel,
  output,
};
