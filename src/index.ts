import { createServer } from './main';

let server: any;

export default async function handler(req: any, res: any) {
  if (!server) {
    server = await createServer();
  }
  return server(req, res);
}
