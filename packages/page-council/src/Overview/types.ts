// Copyright 2017-2021 @godechain/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { DeriveElectionsInfo } from '@godechain/api-derive/types';
import type { SetIndex } from '@godechain/types/interfaces';

export interface ComponentProps {
  electionsInfo?: DeriveElectionsInfo;
}

export interface VoterPosition {
  setIndex: SetIndex;
  globalIndex: BN;
}
