// Copyright 2017-2021 @godechain/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import { BN_MILLION } from '@godechain/util';

export function permillOf (value: BN, perMill: BN): BN {
  return value.mul(perMill).div(BN_MILLION);
}
