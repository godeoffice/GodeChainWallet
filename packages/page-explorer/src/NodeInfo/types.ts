// Copyright 2017-2021 @godechain/app-nodeinfo authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Vec } from '@godechain/types';
import type { BlockNumber, Extrinsic, Health, PeerInfo } from '@godechain/types/interfaces';

export interface Info {
  blockNumber?: BlockNumber;
  extrinsics?: Vec<Extrinsic> | null;
  health?: Health | null;
  peers?: PeerInfo[] | null;
}
