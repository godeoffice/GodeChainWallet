// Copyright 2017-2021 @godechain/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Hash } from '@godechain/types/interfaces';

import { createNamedHook, useApi, useCall } from '@godechain/react-hooks';

const transformCounter = {
  transform: (proposals: Hash[]) => proposals.length
};

function useCounterImpl (): number {
  const { api, isApiReady } = useApi();
  const counter = useCall<number>(isApiReady && api.derive.technicalCommittee?.proposals, undefined, transformCounter) || 0;

  return counter;
}

export default createNamedHook('useCounter', useCounterImpl);
