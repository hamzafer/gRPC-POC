import path from 'path';
import fs from 'fs';
import {IPlugin, PluginError} from "PluginService/src/Plugin/IPlugin";
import {EventEmitter} from "events";

export class PluginService {
    plugins: Set<IPlugin> = new Set<IPlugin>();
    public readonly eventEmitter: EventEmitter = new EventEmitter();
    private readonly PLUGIN_PATH: string = process.env.GAPP_PLUGIN_SERVICE_PATH || 'plugins';

    async loadPlugins(): Promise<PluginError[]> {
        const pluginFolder = path.join(path.resolve(), this.PLUGIN_PATH);
        const pluginFiles = fs.readdirSync(pluginFolder);
        const failedPlugins: PluginError[] = [];

        for (const pluginFile of pluginFiles) {
            const pluginPath = path.join(pluginFolder, pluginFile);
            try {
                const {default: plugin} = await import(pluginPath);
                const pluginObj = new plugin();
                await this.mountPlugin(await pluginObj);
                console.log("The following plugin is loaded successfully: ", pluginFile);
            } catch (e) {
                console.log("Unable to load plugin: ", pluginFile);
                failedPlugins.push(e);
            }
        }
        this.eventEmitter.emit('pluginsLoaded');
        return failedPlugins;
    }

    public async mountPlugin(plugin: IPlugin): Promise<boolean> {
        if (this.plugins.has(plugin)) {
            return false;
        }
        const pluginStatus = await plugin.mount()
        if (pluginStatus) {
            this.plugins.add(plugin);
            this.eventEmitter.emit('pluginMounted', plugin)
            return true;
        }
        return false;
    }
}
