import { v4 as uuidv4 } from "uuid";

export function normalizeFileImage(list) {
  return list.map((file) => {
    if (file.url && !file.uid) {
      return {
        uid: file.id || uuidv4(),
        name: file.url.split("/").pop(),
        status: "done",
        url: file.url,
        ...file,
      };
    }
    return file;
  });
}
