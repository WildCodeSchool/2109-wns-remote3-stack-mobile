import { Image } from 'react-native';
import React from 'react';

export default function Status({ status }: { status: string }) {
  return (
    <>
      {status === 'IN_PROGRESS' && (
        <Image
          width={30}
          height={30}
          source={require('../assets/images/Inprogress.png')}
        />
      )}
      {status === 'TO_DO' && (
        <Image
          width={30}
          height={30}
          source={require('../assets/images/todoTag.png')}
        />
      )}
      {status === 'DONE' && (
        <Image
          width={30}
          height={30}
          source={require('../assets/images/Done.png')}
        />
      )}
    </>
  );
}
