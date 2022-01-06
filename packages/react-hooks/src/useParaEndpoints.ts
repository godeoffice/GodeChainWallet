// Copyright 2017-2021 @godechain/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { LinkOption } from '@godechain/apps-config/endpoints/types';

import { useMemo } from 'react';

import { createWsEndpoints } from '@godechain/apps-config';
import { bnToBn } from '@godechain/util';

import { createNamedHook } from './createNamedHook';
import { useApi } from './useApi';

const endpoints = createWsEndpoints((key: string, value: string | undefined) => value || key);

function extractRelayEndpoints (genesisHash: string): LinkOption[] {
  return endpoints.filter(({ genesisHashRelay }) =>
    genesisHash === genesisHashRelay
  );
}

function extractParaEndpoints (allEndpoints: LinkOption[], paraId: BN | number): LinkOption[] {
  const numId = bnToBn(paraId).toNumber();

  return allEndpoints.filter(({ paraId }) => paraId === numId);
}

function useRelayEndpointsImpl (): LinkOption[] {
  const { api } = useApi();

  return useMemo(
    () => extractRelayEndpoints(api.genesisHash.toHex()),
    [api]
  );
}

export const useRelayEndpoints = createNamedHook('useRelayEndpoints', useRelayEndpointsImpl);

function useParaEndpointsImpl (paraId: BN | number): LinkOption[] {
  const endpoints = useRelayEndpoints();

  return useMemo(
    () => extractParaEndpoints(endpoints, paraId),
    [endpoints, paraId]
  );
}

export const useParaEndpoints = createNamedHook('useParaEndpoints', useParaEndpointsImpl);

function useIsParasLinkedImpl (ids?: (BN | number)[] | null): Record<string, boolean> {
  const endpoints = useRelayEndpoints();

  return useMemo(
    () => ids
      ? ids.reduce((all: Record<string, boolean>, id) => ({
        ...all,
        [id.toString()]: extractParaEndpoints(endpoints, id).length !== 0
      }), {})
      : {},
    [endpoints, ids]
  );
}

export const useIsParasLinked = createNamedHook('useIsParasLinked', useIsParasLinkedImpl);