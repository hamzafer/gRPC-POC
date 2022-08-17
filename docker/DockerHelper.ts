'use strict'
const tar = require('tar-fs');

const Docker = require('dockerode');
const docker = new Docker();

let imageTag = 'our_nginx_image';
let networkName = 'our_network';
let containerName = 'our_container';

buildImage(imageTag, process.cwd()).then(() => {
    console.log('Image built.');
    return createNetwork(networkName);
}).then(() => {
    console.log('Network created.');
    return createContainer(imageTag, containerName, networkName);
}).then(() => {
    console.log('Container created.');
}).catch((err) => {
    console.log(`Something went wrong: ${err.stack}`);
});

/**
 * Creates the container.
 * @param  {String} image The image to be used.
 * @param  {String} containerName A name for the container
 * @param  {String} networkName the docker network to be used.
 * @return {Promise} A primise to retreive a container.
 */
function createContainer(image: string, containerName: string, networkName: string) {
    return new Promise(function (resolve, reject) {
        let hostConfig = {
            NetworkMode: networkName,
            PortBindings: {
                "80/tcp": [
                    {
                        "HostPort": "80",
                        "HostIp": "0.0.0.0"
                    }
                ]
            }
        };

        docker.createContainer({
            Image: image,
            Tty: true,
            name: containerName,
            HostConfig: hostConfig
        }, function (err: any, container: any) {
            if (err) {
                reject(err);
                return;
            }
            //as soon as the container is created we start it!
            container.start({}, function (err: any, data: any) {
                if (err) {
                    reject(err);
                    return;
                }
                console.log("Container Started!")
                resolve(container);
            });
        });
    });
}

/**
 * Creates a local docker network.
 * @param  {String} networkName Name of the network to be created.
 * @return {Promise}  A promise.
 */
function createNetwork(networkName: string) {
    return new Promise(function (resolve, reject) {
        docker.createNetwork({
            "Name": networkName,
            "Driver": "bridge"
        }, function (err: any, result: any) {
            if (err) {
                reject(err);
                return
            }
            resolve();
        });
    });
}

/**
 * Builds a docker image.
 * @param  {String} tag Tag to be applied on the image.
 * @param  {String} buildContextLocation Path to the Docker build context.
 * @return {Promise}  A promise.
 */
function buildImage(tag: string, buildContextLocation: string) {
    return new Promise(function (resolve, reject) {
        var tarStream = tar.pack(buildContextLocation);
        docker.buildImage(tarStream, {
            t: tag
        }, function (err: any, stream: { pipe: (arg0: NodeJS.WriteStream & { fd: 1; }) => void; on: (arg0: string, arg1: (value?: unknown) => void) => void; }) {
            if (err) {
                reject(err);
                return;
            }
            stream.pipe(process.stdout);
            stream.on('end', resolve);
        });
    });
}
