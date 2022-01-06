// Copyright 2017-2021 @godechain/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import React from 'react';

import { CardSummary, SummaryBox } from '@godechain/react-components';
import { FormatBalance } from '@godechain/react-query';
import { formatNumber } from '@godechain/util';

import { useTranslation } from '../translate';

interface Props {
  activeCap: BN;
  activeRaised: BN;
  className?: string;
  fundCount: number;
  totalCap: BN;
  totalRaised: BN;
}

function Summary ({ activeCap, activeRaised, className, fundCount, totalCap, totalRaised }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <SummaryBox className={className}>
      <CardSummary label={t<string>('funds')}>
        {formatNumber(fundCount)}
      </CardSummary>
      <CardSummary
        label={`${t<string>('active raised / cap')}`}
        progress={{
          hideValue: true,
          total: activeCap,
          value: activeRaised
        }}
      >
        <FormatBalance
          value={activeRaised}
          withCurrency={false}
          withSi
        />
        &nbsp;/&nbsp;
        <FormatBalance
          value={activeCap}
          withSi
        />
      </CardSummary>
      <CardSummary
        label={`${t<string>('total raised / cap')}`}
        progress={{
          hideValue: true,
          total: totalCap,
          value: totalRaised
        }}
      >
        <FormatBalance
          value={totalRaised}
          withCurrency={false}
          withSi
        />
        &nbsp;/&nbsp;
        <FormatBalance
          value={totalCap}
          withSi
        />
      </CardSummary>
    </SummaryBox>
  );
}

export default React.memo(Summary);
