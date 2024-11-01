import * as path from "path";

export const getAbsolutePath = (relativePath: string): string => {
  const rootDir = path.resolve(__dirname, "../../");
  return path.resolve(rootDir, relativePath);
};

export const joinPath = (...paths: string[]): string => {
  return path.join(...paths);
};
