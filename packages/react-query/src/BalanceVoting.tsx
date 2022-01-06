// Copyright 2017-2021 @godechain/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveBalancesAll } from '@godechain/api-derive/types';
import type { AccountId, AccountIndex, Address } from '@godechain/types/interfaces';

import React from 'react';

import { useApi, useCall } from '@godechain/react-hooks';

import FormatBalance from './FormatBalance';

interface Props {
  children?: React.ReactNode;
  className?: string;
  isCouncil?: boolean;
  label?: React.ReactNode;
  params?: AccountId | AccountIndex | Address | string | Uint8Array | null;
}

function BalanceVoting ({ children, className = '', isCouncil, label, params }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const allBalances = useCall<DeriveBalancesAll>(api.derive.balances?.all, [params]);

  return (
    <FormatBalance
      className={className}
      label={label}
      value={isCouncil
        ? allBalances?.votingBalance.add(allBalances?.reservedBalance)
        : allBalances?.votingBalance
      }
    >
      {children}
    </FormatBalance>
  );
}

export default React.memo(BalanceVoting);
