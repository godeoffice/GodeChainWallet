// Copyright 2017-2021 @godechain/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Bytes, Option } from '@godechain/types';
import type { Hash } from '@godechain/types/interfaces';

import React from 'react';

import { useApi, useCall } from '@godechain/react-hooks';
import { hexToString } from '@godechain/util';

interface Props {
  hash: Hash;
}

const transformTip = {
  transform: (optBytes: Option<Bytes>) =>
    optBytes.isSome
      ? hexToString(optBytes.unwrap().toHex())
      : null
};

function TipReason ({ hash }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const reasonText = useCall<string | null>((api.query.tips || api.query.treasury).reasons, [hash], transformTip);

  return (
    <td className='start all'>{reasonText || hash.toHex()}</td>
  );
}

export default React.memo(TipReason);
