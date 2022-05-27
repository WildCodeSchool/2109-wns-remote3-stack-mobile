import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';

const generateRNFile = (uri: string, name: string) => {
  return uri
    ? new ReactNativeFile({
        uri,
        type: mime.lookup(uri) || 'image',
        name,
      })
    : null;
};

export default generateRNFile;
