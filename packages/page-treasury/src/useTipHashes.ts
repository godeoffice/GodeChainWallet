// Copyright 2017-2021 @godechain/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { StorageKey } from '@godechain/types';
import type { Hash } from '@godechain/types/interfaces';

import { createNamedHook, useApi, useEventTrigger, useMapKeys } from '@godechain/react-hooks';

function extractHashes (keys: StorageKey<[Hash]>[]): string[] {
  return keys.map(({ args: [hash] }) => hash.toHex());
}

function useTipHashesImpl (): string[] | undefined {
  const { api } = useApi();
  const trigger = useEventTrigger([api.events.tips?.NewTip, api.events.tips?.TipClosed, api.events.tips?.TipRetracted]);

  return useMapKeys((api.query.tips || api.query.treasury)?.tips, { at: trigger.blockHash, transform: extractHashes });
}

export default createNamedHook('useTipHashes', useTipHashesImpl);
