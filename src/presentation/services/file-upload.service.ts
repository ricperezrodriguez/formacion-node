import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import { CustomError } from "../../domain";

export class FileUploadService {
  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  async uploadSingle(
    file: UploadedFile,
    fileName: string,
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    try {
      const fileExtension = file.mimetype.split("/").at(1) ?? "";
      if (!validExtensions?.includes(fileExtension)) {
        throw CustomError.badRequest(
          `Invalid extension: ${fileExtension}, valid ones ${validExtensions}`
        );
      }

      const destination = path.resolve(__dirname, "../../../", folder);
      this.checkFolder(destination);

      file.mv(`${destination}/${fileName}.${fileExtension}`);
      return fileName;
    } catch (error) {
      throw error;
    }
  }

  async uploadMultiple(
    files: UploadedFile[],
    fileName: string,
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    const filesNames = await Promise.all(
      files.map((file) =>
        this.uploadSingle(file, fileName, folder, validExtensions)
      )
    );
    return filesNames;
  }

  async getFiles(nameFile: string) {
    const imagePath = path.resolve(__dirname, `../../../uploads/${nameFile}`);

    if (!fs.existsSync(imagePath)) {
      throw CustomError.badRequest("Image not found");
    }

    return imagePath;
  }
}
