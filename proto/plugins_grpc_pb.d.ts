// package: plugins
// file: plugins.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as plugins_pb from "./plugins_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IPluginsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getMessage: IPluginsService_IGetMessage;
}

interface IPluginsService_IGetMessage extends grpc.MethodDefinition<plugins_pb.PluginRequest, plugins_pb.Plugin> {
    path: "/plugins.Plugins/GetMessage";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<plugins_pb.PluginRequest>;
    requestDeserialize: grpc.deserialize<plugins_pb.PluginRequest>;
    responseSerialize: grpc.serialize<plugins_pb.Plugin>;
    responseDeserialize: grpc.deserialize<plugins_pb.Plugin>;
}

export const PluginsService: IPluginsService;

export interface IPluginsServer {
    getMessage: grpc.handleUnaryCall<plugins_pb.PluginRequest, plugins_pb.Plugin>;
}

export interface IPluginsClient {
    getMessage(request: plugins_pb.PluginRequest, callback: (error: grpc.ServiceError | null, response: plugins_pb.Plugin) => void): grpc.ClientUnaryCall;
    getMessage(request: plugins_pb.PluginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: plugins_pb.Plugin) => void): grpc.ClientUnaryCall;
    getMessage(request: plugins_pb.PluginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: plugins_pb.Plugin) => void): grpc.ClientUnaryCall;
}

export class PluginsClient extends grpc.Client implements IPluginsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getMessage(request: plugins_pb.PluginRequest, callback: (error: grpc.ServiceError | null, response: plugins_pb.Plugin) => void): grpc.ClientUnaryCall;
    public getMessage(request: plugins_pb.PluginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: plugins_pb.Plugin) => void): grpc.ClientUnaryCall;
    public getMessage(request: plugins_pb.PluginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: plugins_pb.Plugin) => void): grpc.ClientUnaryCall;
}
