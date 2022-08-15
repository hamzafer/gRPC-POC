import {Plugin, PluginStatus} from "../proto/plugins_pb";

export function pluginToClass({message, status}: Plugin.AsObject) {
    const plugin = new Plugin();

    plugin.setMessage(message);
    plugin.setStatus(status);

    return plugin;
}

export const plugins: Plugin[] = [
    {id: 1, message: "hi", status: PluginStatus.AVAILABLE},
    {id: 2, message: "ok", status: PluginStatus.AVAILABLE}
].map(pluginToClass);