import {DockerHelper} from "./docker/DockerHelper";

const imageTag = 'our_nginx_image';
const networkName = 'our_network';
const containerName = 'our_container';
const dockerHelper = new DockerHelper();

dockerHelper.buildImage(imageTag, process.cwd()).then(() => {
    console.log('Image built.');
    return dockerHelper.createNetwork(networkName);
}).then(() => {
    console.log('Network created.');
    return dockerHelper.createContainer(imageTag, containerName, networkName);
}).then(() => {
    console.log('Container created.');
}).catch((err: { stack: any; }) => {
    console.log(`Something went wrong: ${err.stack}`);
});
