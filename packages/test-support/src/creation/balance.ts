// Copyright 2017-2021 @godechain/test-supports authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TypeRegistry, u128 as U128 } from '@godechain/types';

export function balanceOf (number: number | string): U128 {
  return new U128(new TypeRegistry(), number);
}
