// Copyright 2017-2021 @godechain/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';

import { createNamedHook, useIsMountedRef } from '@godechain/react-hooks';
import { keyring } from '@godechain/ui-keyring';

interface UseContracts {
  allContracts: string[];
  hasContracts: boolean;
  isContract: (address: string) => boolean;
}

const DEFAULT_STATE: UseContracts = {
  allContracts: [],
  hasContracts: false,
  isContract: () => false
};

function useContractsImpl (): UseContracts {
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState<UseContracts>(DEFAULT_STATE);

  useEffect((): () => void => {
    const subscription = keyring.contracts.subject.subscribe((contracts): void => {
      if (mountedRef.current) {
        const allContracts = contracts ? Object.keys(contracts) : [];
        const hasContracts = allContracts.length !== 0;
        const isContract = (address: string) => allContracts.includes(address);

        setState({ allContracts, hasContracts, isContract });
      }
    });

    return (): void => {
      setTimeout(() => subscription.unsubscribe(), 0);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}

export const useContracts = createNamedHook('useContracts', useContractsImpl);