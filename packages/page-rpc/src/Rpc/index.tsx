// Copyright 2017-2021 @godechain/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useContext } from 'react';

import { StatusContext } from '@godechain/react-components';

import Results from './Results';
import Selection from './Selection';

function RpcApp (): React.ReactElement {
  const { queueRpc, txqueue } = useContext(StatusContext);

  return (
    <>
      <Selection queueRpc={queueRpc} />
      <Results queue={txqueue} />
    </>
  );
}

export default React.memo(RpcApp);
