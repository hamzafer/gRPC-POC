const tar = require('tar-fs');
const Docker = require('dockerode');
const docker = new Docker();

export class DockerHelper {
    /**
     * Creates the container.
     * @param  {String} image The image to be used.
     * @param  {String} containerName A name for the container
     * @param  {String} networkName the docker network to be used.
     * @return {Promise} A primise to retreive a container.
     */
    public createContainer(image: string, containerName: string, networkName: string) {
        return new Promise(function (resolve, reject) {
            let hostConfig = {
                NetworkMode: networkName,
                PortBindings: {
                    "4000/tcp": [
                        {
                            "HostPort": "4000",
                            "HostIp": "0.0.0.0"
                        }
                    ]
                }
            };

            docker.createContainer({
                Image: image,
                Tty: true,
                name: containerName,
                HostConfig: hostConfig,
                ExposedPorts: {
                    "4000/tcp": {}
                }
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
    public createNetwork(networkName: string) {
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
    public buildImage(tag: string, buildContextLocation: string) {
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
}