// Copyright 2017-2021 @godechain/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveTreasuryProposals } from '@godechain/api-derive/types';

import { useMemo } from 'react';

import { createNamedHook, useAccounts, useApi, useCall } from '@godechain/react-hooks';

function useCounterImpl (): number {
  const { hasAccounts } = useAccounts();
  const { api, isApiReady } = useApi();
  const proposals = useCall<DeriveTreasuryProposals>(isApiReady && hasAccounts && api.derive.treasury?.proposals);

  return useMemo(
    () => proposals?.proposals.length || 0,
    [proposals]
  );
}

export default createNamedHook('useCounter', useCounterImpl);
