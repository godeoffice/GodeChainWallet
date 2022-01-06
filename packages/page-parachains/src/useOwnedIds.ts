// Copyright 2017-2021 @godechain/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option, StorageKey } from '@godechain/types';
import type { Hash, ParaId } from '@godechain/types/interfaces';
import type { godechainRuntimeCommonParasRegistrarParaInfo } from '@godechain/types/lookup';
import type { OwnedId, OwnedIdPartial } from './types';

import { useMemo } from 'react';

import { createNamedHook, useAccounts, useApi, useCall, useEventTrigger, useMapEntries } from '@godechain/react-hooks';

interface CodeHash {
  hash: Hash | null;
  paraId: ParaId;
}

interface Owned {
  ids: ParaId[];
  owned: OwnedIdPartial[];
}

function extractIds (entries: [StorageKey<[ParaId]>, Option<godechainRuntimeCommonParasRegistrarParaInfo>][]): Owned {
  const owned = entries
    .map(([{ args: [paraId] }, optInfo]): OwnedIdPartial | null => {
      if (optInfo.isNone) {
        return null;
      }

      const paraInfo = optInfo.unwrap();

      return {
        manager: paraInfo.manager.toString(),
        paraId,
        paraInfo
      };
    })
    .filter((id): id is OwnedIdPartial => !!id);

  return {
    ids: owned.map(({ paraId }) => paraId),
    owned
  };
}

const hashesOption = {
  transform: ([[paraIds], optHashes]: [[ParaId[]], Option<Hash>[]]) =>
    paraIds.map((paraId, index): CodeHash => ({
      hash: optHashes[index].unwrapOr(null),
      paraId
    })),
  withParamsTransform: true
};

function useOwnedIdsImpl (): OwnedId[] {
  const { api } = useApi();
  const { allAccounts } = useAccounts();
  const trigger = useEventTrigger([api.events.registrar.Registered, api.events.registrar.Reserved]);
  const unfiltered = useMapEntries<Owned>(api.query.registrar.paras, { at: trigger.blockHash, transform: extractIds });
  const hashes = useCall(api.query.paras.currentCodeHash.multi, [unfiltered ? unfiltered.ids : []], hashesOption);

  return useMemo(
    () => unfiltered && hashes
      ? unfiltered.owned
        .filter((id) => allAccounts.some((a) => a === id.manager))
        .map((data): OwnedId => ({
          ...data,
          hasCode: hashes.some((h) => !!h.hash && h.paraId.eq(data.paraId))
        }))
      : [],
    [allAccounts, hashes, unfiltered]
  );
}

export default createNamedHook('useOwnedIds', useOwnedIdsImpl);
