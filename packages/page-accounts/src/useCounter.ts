// Copyright 2017-2021 @godechain/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createNamedHook, useAccounts } from '@godechain/react-hooks';

function useCounterImpl (): string | null {
  const { hasAccounts } = useAccounts();

  return hasAccounts ? null : '!';
}

export default createNamedHook('useCounter', useCounterImpl);
