// Copyright 2017-2021 @godechain/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option, StorageKey } from '@godechain/types';
import type { ParaId } from '@godechain/types/interfaces';
import type { godechainRuntimeParachainsParasParaLifecycle } from '@godechain/types/lookup';

import { createNamedHook, useApi, useEventTrigger, useMapEntries } from '@godechain/react-hooks';

function extractIds (entries: [StorageKey<[ParaId]>, Option<godechainRuntimeParachainsParasParaLifecycle>][]): ParaId[] {
  return entries
    .map(([{ args: [paraId] }, optValue]): ParaId | null => {
      const value = optValue.unwrapOr(null);

      return value && (
        value.isParathread ||
        value.isUpgradingParathread ||
        value.isOffboardingParathread ||
        value.isOnboarding
      )
        ? paraId
        : null;
    })
    .filter((paraId): paraId is ParaId => !!paraId)
    .sort((a, b) => a.cmp(b));
}

function useUpomingIdsImpl (): ParaId[] | undefined {
  const { api } = useApi();
  const trigger = useEventTrigger([
    api.events.session.NewSession,
    api.events.registrar.Registered
  ]);

  return useMapEntries(api.query.paras.paraLifecycles, {
    at: trigger.blockHash,
    transform: extractIds
  });
}

export default createNamedHook('useUpomingIds', useUpomingIdsImpl);
