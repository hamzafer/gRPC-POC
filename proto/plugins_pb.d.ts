// package: plugins
// file: plugins.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Plugin extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): Plugin;

    getStatus(): PluginStatus;
    setStatus(value: PluginStatus): Plugin;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Plugin.AsObject;
    static toObject(includeInstance: boolean, msg: Plugin): Plugin.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Plugin, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Plugin;
    static deserializeBinaryFromReader(message: Plugin, reader: jspb.BinaryReader): Plugin;
}

export namespace Plugin {
    export type AsObject = {
        message: string,
        status: PluginStatus,
    }
}

export class PluginRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): PluginRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PluginRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PluginRequest): PluginRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PluginRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PluginRequest;
    static deserializeBinaryFromReader(message: PluginRequest, reader: jspb.BinaryReader): PluginRequest;
}

export namespace PluginRequest {
    export type AsObject = {
        id: number,
    }
}

export enum PluginStatus {
    UNKNOWN = 0,
    OFFLINE = 1,
    BUSY = 2,
    AVAILABLE = 3,
}
