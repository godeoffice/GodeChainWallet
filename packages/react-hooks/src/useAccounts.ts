// Copyright 2017-2021 @godechain/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';

import { keyring } from '@godechain/ui-keyring';
import { u8aToHex } from '@godechain/util';
import { decodeAddress } from '@godechain/util-crypto';

import { createNamedHook } from './createNamedHook';
import { useIsMountedRef } from './useIsMountedRef';

export interface UseAccounts {
  allAccounts: string[];
  allAccountsHex: string[];
  areAccountsLoaded: boolean
  hasAccounts: boolean;
  isAccount: (address?: string | null) => boolean;
}

const EMPTY: UseAccounts = { allAccounts: [], allAccountsHex: [], areAccountsLoaded: false, hasAccounts: false, isAccount: () => false };

function useAccountsImpl (): UseAccounts {
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState<UseAccounts>(EMPTY);

  useEffect((): () => void => {
    const subscription = keyring.accounts.subject.subscribe((accounts): void => {
      if (mountedRef.current) {
        const allAccounts = accounts ? Object.keys(accounts) : [];
        const allAccountsHex = allAccounts.map((a) => u8aToHex(decodeAddress(a)));
        const hasAccounts = allAccounts.length !== 0;
        const isAccount = (address?: string | null) => !!address && allAccounts.includes(address);

        setState({ allAccounts, allAccountsHex, areAccountsLoaded: true, hasAccounts, isAccount });
      }
    });

    return (): void => {
      setTimeout(() => subscription.unsubscribe(), 0);
    };
  }, [mountedRef]);

  return state;
}

export const useAccounts = createNamedHook('useAccounts', useAccountsImpl);
