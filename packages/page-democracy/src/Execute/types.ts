// Copyright 2017-2021 @godechain/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Bytes, Option } from '@godechain/types';
import type { BlockNumber, Call, SchedulePeriod, SchedulePriority } from '@godechain/types/interfaces';

export interface ScheduledExt {
  blockNumber: BlockNumber;
  call: Call;
  key: string;
  maybeId: Option<Bytes>;
  maybePeriodic: Option<SchedulePeriod>;
  priority: SchedulePriority;
}
