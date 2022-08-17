import { Server, ServerCredentials } from "grpc";
import {PluginsService} from "../proto/plugins_grpc_pb";
import {PluginsServer} from "./services";

const server = new Server();
server.addService(PluginsService, new PluginsServer());

const port = 4000;
const uri = `0.0.0.0:${port}`;
console.log(`Listening on ${uri}`);
server.bind(uri, ServerCredentials.createInsecure());

server.start();
