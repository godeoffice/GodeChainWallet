// Copyright 2017-2021 @godechain/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option, StorageKey } from '@godechain/types';
import type { AccountId, BalanceOf } from '@godechain/types/interfaces';
import type { PalletSocietyBidKind } from '@godechain/types/lookup';
import type { ITuple } from '@godechain/types/types';

import React, { useRef } from 'react';

import { Table } from '@godechain/react-components';
import { useApi, useCall } from '@godechain/react-hooks';

import { useTranslation } from '../translate';
import Suspension from './Suspension';

interface Props {
  className?: string;
}

interface CandidateSuspend {
  accountId: AccountId;
  balance: BalanceOf;
  bid: PalletSocietyBidKind;
}

const optExtractCandidates = {
  transform: (entries: [StorageKey<[AccountId]>, Option<ITuple<[BalanceOf, PalletSocietyBidKind]>>][]): CandidateSuspend[] =>
    entries
      .filter(([{ args: [accountId] }, opt]) => opt.isSome && accountId)
      .map(([{ args: [accountId] }, opt]) => {
        const [balance, bid] = opt.unwrap();

        return { accountId, balance, bid };
      })
      .sort((a, b) => a.balance.cmp(b.balance))
};

const optExtractAccounts = {
  transform: (keys: StorageKey<[AccountId]>[]): AccountId[] =>
    keys
      .map(({ args: [accountId] }) => accountId)
      .filter((a) => !!a)
};

function Suspended ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const candidates = useCall<CandidateSuspend[]>(api.query.society.suspendedCandidates.entries, undefined, optExtractCandidates);
  const members = useCall<AccountId[]>(api.query.society.suspendedMembers.keys, undefined, optExtractAccounts);

  const headerRef = useRef({
    candidates: [
      [t('candidates'), 'start'],
      [t('bid kind'), 'start', 2],
      [t('value')]
    ],
    members: [
      [t('members'), 'start']
    ]
  });

  return (
    <div className={className}>
      <Table
        className={className}
        empty={members && t<string>('No suspended members')}
        header={headerRef.current.members}
      >
        {members?.map((accountId): React.ReactNode => (
          <Suspension
            key={accountId.toString()}
            value={accountId}
          />
        ))}
      </Table>
      <Table
        className={className}
        empty={candidates && t<string>('No suspended candidates')}
        header={headerRef.current.candidates}
      >
        {candidates?.map(({ accountId, balance, bid }): React.ReactNode => (
          <Suspension
            balance={balance}
            bid={bid}
            key={accountId.toString()}
            value={accountId}
          />
        ))}
      </Table>
    </div>
  );
}

export default React.memo(Suspended);
