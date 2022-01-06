// Copyright 2017-2021 @godechain/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveStakingAccount } from '@godechain/api-derive/types';

import { createNamedHook } from './createNamedHook';
import { useApi } from './useApi';
import { useCall } from './useCall';

function useStakingInfoImpl (accountId: string | null): DeriveStakingAccount | undefined {
  const { api } = useApi();

  return useCall<DeriveStakingAccount>(api.derive.staking?.account, [accountId]);
}

export const useStakingInfo = createNamedHook('useStakingInfo', useStakingInfoImpl);
