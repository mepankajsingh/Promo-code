import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

const userIp = defineEventHandler((event) => {
  const forwarded = event.node.req.headers["x-forwarded-for"];
  const ip = forwarded ? typeof forwarded === "string" ? forwarded.split(",")[0].trim() : forwarded[0] : event.node.req.headers["x-real-ip"] || event.node.req.socket.remoteAddress || "0.0.0.0";
  return { ip };
});

export { userIp as default };
//# sourceMappingURL=userIp.mjs.map
