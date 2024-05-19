import express, { Router } from "express";
import fileUpload from "express-fileupload";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "../docs/swagger";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();

  private serverListener?: any;

  private readonly port: number;
  private readonly routes: Router;
  private readonly public_path: string;

  constructor({ port, routes, public_path = "public" }: Options) {
    this.port = port;
    this.routes = routes;
    this.public_path = public_path;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(
      "/documentation",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSetup)
    );
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );

    //* Public Folder
    this.app.use(express.static(this.public_path));

    //* Routes
    this.app.use(this.routes);

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.public_path}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  close() {
    this.serverListener?.close();
  }
}
