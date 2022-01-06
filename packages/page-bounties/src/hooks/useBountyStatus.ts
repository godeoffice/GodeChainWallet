// Copyright 2017-2021 @godechain/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BountyStatusType } from '@godechain/app-bounties/types';

import { useCallback } from 'react';

import { getBountyStatus } from '@godechain/app-bounties/helpers';
import { createNamedHook } from '@godechain/react-hooks';
import { BountyStatus } from '@godechain/types/interfaces';

function useBountyStatusImpl (status: BountyStatus): BountyStatusType {
  const updateStatus = useCallback(() => getBountyStatus(status), [status]);

  return updateStatus();
}

export const useBountyStatus = createNamedHook('useBountyStatus', useBountyStatusImpl);
