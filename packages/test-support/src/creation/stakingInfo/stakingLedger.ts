// Copyright 2017-2021 @godechain/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { PalletStakingStakingLedger } from '@godechain/types/lookup';

import BN from 'bn.js';

import { TypeRegistry } from '@godechain/types/create';

export function makeStakingLedger (active: BN | number | string): PalletStakingStakingLedger {
  const reg = new TypeRegistry();

  // Constructing the whole StakingLedger structure is hard,
  // so we fill out just the fields that are definitely required,
  // and hope that nothing more is required.

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return {
    active: reg.createType('Compact<Balance>', reg.createType('Balance', new BN(active)))
  } as PalletStakingStakingLedger;
}
