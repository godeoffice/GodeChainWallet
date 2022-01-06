// Copyright 2017-2021 @godechain/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountId, BalanceOf } from '@godechain/types/interfaces';

import { createNamedHook } from './createNamedHook';
import { useApi } from './useApi';
import { useCall } from './useCall';

function useSubidentitiesImpl (address: string): AccountId[] | undefined {
  const { api } = useApi();

  return useCall<[BalanceOf, AccountId[]]>(api.query.identity?.subsOf, [address])?.[1];
}

export const useSubidentities = createNamedHook('useSubidentities', useSubidentitiesImpl);
