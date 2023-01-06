import ImageKit from 'imagekit';
import {setupURLPolyfill} from 'react-native-url-polyfill';

export const urlEndpointBaseShades =
  'https://ik.imagekit.io/euphoria/baseShades/';
const publicKey = 'public_kfu8UXWcLAePF9XKfYK0Lm/Lo1Q=';

setupURLPolyfill();

export function getImagekitUrlFromBaseShades(imageSrc, transformationArr) {
  var imagekitConfigOptions = {urlEndpoint: urlEndpointBaseShades};
  if (publicKey) imagekitConfigOptions.publicKey = publicKey;
  const imagekit = new ImageKit(imagekitConfigOptions);
  var ikOptions = {
    src: imageSrc,
    transformation: transformationArr,
  };
  var imageURL = imagekit.url(ikOptions);

  return imageURL;
}
