import {ISettings} from "PluginService/src/Interface/ISettings";
import {IPlugin} from "PluginService/src/Plugin/IPlugin";

export default class CliPlugin implements IPlugin {

    getAuthor(): string {
        return "";
    }

    getAuthorEmail(): string {
        return "";
    }

    getAuthorUrl(): string {
        return "";
    }

    getDescription(): string {
        return "";
    }

    getDonateUrl(): string {
        return "";
    }

    getId(): string {
        return "gapp-blocks-cli";
    }

    getLicense(): string {
        return "";
    }

    getLicenseUrl(): string {
        return "";
    }

    getName(): string {
        return "";
    }

    getSettings(): Promise<ISettings> {
        return Promise.resolve(undefined).then(); // TODO: this line was throwing error by default.
    }

    getVersion(): string {
        return "";
    }

    mount(): Promise<boolean> {
        console.log('GRPC   ------   Mounting hamza');
        return new Promise(resolve => {
            resolve(true);
        })
    }

    setSettings(settings: ISettings): Promise<boolean> {
        return Promise.resolve(false);
    }

    unmount(): Promise<boolean> {
        return new Promise(resolve => {
            resolve(true);
        })
    }
}
