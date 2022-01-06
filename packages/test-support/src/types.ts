// Copyright 2017-2021 @godechain/test-supports authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveBalancesAll, DeriveStakingAccount } from '@godechain/api-derive/types';
import { UseAccountInfo } from '@godechain/react-hooks/types';
import { KeyringJson$Meta } from '@godechain/ui-keyring/types';

export type Override<T> = {
  [P in keyof T]?: T[P];
}

export interface AccountOverrides {
  meta?: Override<KeyringJson$Meta>;
  balance?: Override<DeriveBalancesAll>;
  staking?: Override<DeriveStakingAccount>;
  info?: Override<UseAccountInfo>;
}
