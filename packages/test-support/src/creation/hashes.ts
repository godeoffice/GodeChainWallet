// Copyright 2017-2021 @godechain/test-support authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Hash } from '@godechain/types/interfaces';

import { godechain_GENESIS } from '@godechain/apps-config';
import { TypeRegistry } from '@godechain/types/create';

export function aGenesisHash (): Hash {
  return new TypeRegistry().createType('Hash', godechain_GENESIS);
}

export function aHash (): Hash {
  return new TypeRegistry().createType('Hash');
}
