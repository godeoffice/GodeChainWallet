// Copyright 2017-2021 @godechain/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createNamedHook } from '@godechain/react-hooks';

import usegodechainPreclaims from './usegodechainPreclaims';

function useCounterImpl (): number {
  const needAttest = usegodechainPreclaims();

  return needAttest.length;
}

export default createNamedHook('useCounter', useCounterImpl);
