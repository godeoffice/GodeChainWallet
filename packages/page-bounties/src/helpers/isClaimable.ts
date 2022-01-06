// Copyright 2017-2021 @godechain/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { AccountId } from '@godechain/types/interfaces';

export function isClaimable (accounts: string[], beneficiary: AccountId, payoutDue: BN): boolean {
  return payoutDue.ltn(0) && accounts.includes(beneficiary.toString());
}
