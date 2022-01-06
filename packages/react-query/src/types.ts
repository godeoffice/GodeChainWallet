// Copyright 2017-2021 @godechain/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BlockNumber, EventRecord } from '@godechain/types/interfaces';

export interface IndexedEvent {
  indexes: number[];
  record: EventRecord;
}

export interface KeyedEvent extends IndexedEvent {
  blockHash?: string;
  blockNumber?: BlockNumber;
  key: string;
}
