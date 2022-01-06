// Copyright 2017-2021 @godechain/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Bid } from '@godechain/types/interfaces';

import { createNamedHook, useApi, useCall } from '@godechain/react-hooks';

function useCounterImpl (): number {
  const { api } = useApi();
  const bids = useCall<Bid[]>(api.query.society?.candidates);

  return bids?.length || 0;
}

export default createNamedHook('useCounter', useCounterImpl);
