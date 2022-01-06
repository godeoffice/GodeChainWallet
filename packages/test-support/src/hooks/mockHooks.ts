// Copyright 2017-2021 @godechain/test-support authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { defaultTreasury } from '@godechain/test-support/creation/treasury/defaults';
import { defaultMembers } from '@godechain/test-support/keyring/addresses';
import { extractTime } from '@godechain/util';

export const mockHooks = {
  blockTime: [50, '', extractTime(1)],
  members: defaultMembers,
  treasury: defaultTreasury
};
