// Copyright 2017-2021 @godechain/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BlockNumber, Header, ParaId, RuntimeVersion } from '@godechain/types/interfaces';

import React from 'react';
import styled from 'styled-components';

import { useCall, useParaApi } from '@godechain/react-hooks';
import { formatNumber } from '@godechain/util';

interface Props {
  className?: string;
  id: ParaId;
}

const transformHeader = {
  transform: (header: Header) => header.number.unwrap()
};

function ParachainInfo ({ className, id }: Props): React.ReactElement<Props> {
  const { api } = useParaApi(id);

  // We are not using the derive here, we keep this queries to the point to not overload
  const bestNumber = useCall<BlockNumber>(api?.rpc.chain.subscribeNewHeads, undefined, transformHeader);
  const runtimeVersion = useCall<RuntimeVersion>(api?.rpc.state.subscribeRuntimeVersion);

  return (
    <div className={className}>
      {bestNumber && <div>{formatNumber(bestNumber)}</div>}
      {runtimeVersion && <div className='version'><div className='media--1100'>{runtimeVersion.specName.toString()}</div><div className='media--1100'>/</div><div>{runtimeVersion.specVersion.toString()}</div></div>}
    </div>
  );
}

export default React.memo(styled(ParachainInfo)`
  .version {
    font-size: 0.85rem;
    white-space: nowrap;

    > div {
      display: inline-block;
      overflow: hidden;
      max-width: 10em;
      text-overflow: ellipsis;
    }
  }
`);
