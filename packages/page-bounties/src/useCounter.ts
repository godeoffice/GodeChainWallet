// Copyright 2017-2021 @godechain/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import { DeriveBounties } from '@godechain/api-derive/types';
import { createNamedHook, useApi, useCall } from '@godechain/react-hooks';

function useCounterImpl (): number {
  const { api, isApiReady } = useApi();
  const bounties = useCall<DeriveBounties>(isApiReady && api.derive.bounties?.bounties);

  return useMemo(
    () => bounties?.length || 0,
    [bounties]
  );
}

export default createNamedHook('useCounter', useCounterImpl);
