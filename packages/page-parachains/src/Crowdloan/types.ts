// Copyright 2017-2021 @godechain/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TrieIndex } from '@godechain/types/interfaces';

export interface Contributed {
  accountIds: string[];
  count: number;
  trieIndex: TrieIndex;
}
