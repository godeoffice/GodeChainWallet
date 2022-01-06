// Copyright 2017-2021 @godechain/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { PalletDemocracyVoteVoting } from '@godechain/types/lookup';

import { useAccounts, useApi, useCall } from '@godechain/react-hooks';

import { createNamedHook } from './createNamedHook';

function useDelegationsImpl (): PalletDemocracyVoteVoting[] | undefined {
  const { api } = useApi();
  const { allAccounts } = useAccounts();

  return useCall<PalletDemocracyVoteVoting[]>(api.query.democracy?.votingOf?.multi, [allAccounts]);
}

export const useDelegations = createNamedHook('useDelegations', useDelegationsImpl);
