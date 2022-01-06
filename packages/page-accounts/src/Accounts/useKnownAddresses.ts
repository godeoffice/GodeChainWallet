// Copyright 2017-2021 @godechain/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import { createNamedHook, useAccounts, useAddresses } from '@godechain/react-hooks';

function useKnownAddressesImpl (exclude?: string): string[] {
  const { allAccounts } = useAccounts();
  const { allAddresses } = useAddresses();

  return useMemo(
    () => [...allAccounts, ...allAddresses].filter((a) => a !== exclude),
    [allAccounts, allAddresses, exclude]
  );
}

export default createNamedHook('useKnownAddresses', useKnownAddressesImpl);
