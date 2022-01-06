// Copyright 2017-2021 @godechain/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { StorageKey } from '@godechain/types';
import type { AssetId } from '@godechain/types/interfaces';

import { createNamedHook, useApi, useEventTrigger, useMapKeys } from '@godechain/react-hooks';

function extractAssetIds (keys: StorageKey<[AssetId]>[]): AssetId[] {
  return keys
    .map(({ args: [assetId] }) => assetId)
    .sort((a, b) => a.cmp(b));
}

function useAssetIdsImpl (): AssetId[] | undefined {
  const { api } = useApi();
  const trigger = useEventTrigger([api.events.assets.Created, api.events.assets.Destroyed]);

  return useMapKeys(api.query.assets.asset, { at: trigger.blockHash, transform: extractAssetIds });
}

export default createNamedHook('useAssetIds', useAssetIdsImpl);
