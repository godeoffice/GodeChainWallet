// Copyright 2017-2021 @godechain/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { AccountId, ParaValidatorIndex } from '@godechain/types/interfaces';

export interface EventMapInfo {
  blockHash: string;
  blockNumber: BN;
  relayParent: string;
}

export interface ValidatorInfo {
  indexActive: ParaValidatorIndex;
  indexValidator: ParaValidatorIndex;
  validatorId: AccountId;
}
