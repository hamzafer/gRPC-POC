import {sendUnaryData, ServerUnaryCall, ServiceError,} from "grpc";

import {IPluginsServer} from "../proto/plugins_grpc_pb";
import {Plugin, PluginRequest} from "../proto/plugins_pb";

import {plugins} from "./plugin";

export class PluginsServer implements IPluginsServer {
    getMessage(call: ServerUnaryCall<PluginRequest>, callback: sendUnaryData<Plugin>): void {
        const pluginId = call.request.getId();
        const plugin = plugins.find((p) => p.getId() === pluginId);
        console.log(`Request with ID ${pluginId} received`);

        if (!plugin) {
            const error: ServiceError = {
                name: "Plugin Missing",
                message: `Plugin with ID ${pluginId} does not exist.`,
            };
            callback(error, null);
            return;
        }

        console.log(`getMessage: returning ${plugin.getMessage()} (id: ${plugin.getId()}).`);
        callback(null, plugin);
    }
}
