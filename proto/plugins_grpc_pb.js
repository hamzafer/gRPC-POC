// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var plugins_pb = require('./plugins_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_plugins_Plugin(arg) {
  if (!(arg instanceof plugins_pb.Plugin)) {
    throw new Error('Expected argument of type plugins.Plugin');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_plugins_Plugin(buffer_arg) {
  return plugins_pb.Plugin.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_plugins_PluginRequest(arg) {
  if (!(arg instanceof plugins_pb.PluginRequest)) {
    throw new Error('Expected argument of type plugins.PluginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_plugins_PluginRequest(buffer_arg) {
  return plugins_pb.PluginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var PluginsService = exports.PluginsService = {
  getMessage: {
    path: '/plugins.Plugins/GetMessage',
    requestStream: false,
    responseStream: false,
    requestType: plugins_pb.PluginRequest,
    responseType: plugins_pb.Plugin,
    requestSerialize: serialize_plugins_PluginRequest,
    requestDeserialize: deserialize_plugins_PluginRequest,
    responseSerialize: serialize_plugins_Plugin,
    responseDeserialize: deserialize_plugins_Plugin,
  },
};

exports.PluginsClient = grpc.makeGenericClientConstructor(PluginsService);
