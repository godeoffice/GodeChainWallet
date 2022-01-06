// Copyright 2017-2021 @godechain/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { u32 } from '@godechain/types';
import type { ComponentProps as Props } from '../types';

import React from 'react';

import { CardSummary, SummaryBox } from '@godechain/react-components';
import { useApi, useCall } from '@godechain/react-hooks';
import { formatNumber } from '@godechain/util';

import { useTranslation } from '../translate';

function Summary ({ className = '', members, proposalHashes, type }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const proposalCount = useCall<u32>(api.derive[type].proposalCount);

  return (
    <SummaryBox className={className}>
      <CardSummary label={t<string>('members')}>
        {formatNumber(members.length)}
      </CardSummary>
      {proposalCount && (
        <section>
          <CardSummary label={t<string>('proposals')}>
            {formatNumber(proposalHashes?.length)}
          </CardSummary>
          <CardSummary label={t<string>('total')}>
            {formatNumber(proposalCount)}
          </CardSummary>
        </section>
      )}
    </SummaryBox>
  );
}

export default React.memo(Summary);
