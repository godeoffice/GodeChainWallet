// Copyright 2017-2021 @godechain/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createNamedHook } from '@godechain/react-hooks';

import useExtensions from './useExtensions';

function useCounterImpl (): number {
  const { count } = useExtensions();

  return count;
}

export default createNamedHook('useCounter', useCounterImpl);
