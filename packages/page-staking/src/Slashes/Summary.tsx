// Copyright 2017-2021 @godechain/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveSessionProgress } from '@godechain/api-derive/types';
import type { SlashEra } from './types';

import BN from 'bn.js';
import React, { useMemo } from 'react';

import { CardSummary, SummaryBox } from '@godechain/react-components';
import { useApi, useCall } from '@godechain/react-hooks';
import { FormatBalance } from '@godechain/react-query';
import { BN_ONE, formatNumber } from '@godechain/util';

import { useTranslation } from '../translate';

interface Props {
  slash: SlashEra;
}

function Header ({ slash: { era, nominators, reporters, total, validators } }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const sessionInfo = useCall<DeriveSessionProgress>(api.derive.session?.progress);

  const [blockProgress, blockEnd] = useMemo(
    () => sessionInfo
      ? [
        sessionInfo.activeEra.sub(era).isub(BN_ONE).imul(sessionInfo.eraLength).iadd(sessionInfo.eraProgress),
        api.consts.staking.slashDeferDuration.mul(sessionInfo.eraLength)
      ]
      : [new BN(0), new BN(0)],
    [api, era, sessionInfo]
  );

  return (
    <SummaryBox>
      <section>
        <CardSummary label={t<string>('validators')}>
          {formatNumber(validators.length)}
        </CardSummary>
        <CardSummary label={t<string>('nominators')}>
          {formatNumber(nominators.length)}
        </CardSummary>
        <CardSummary label={t<string>('reporters')}>
          {formatNumber(reporters.length)}
        </CardSummary>
      </section>
      {blockProgress.gtn(0) && (
        <CardSummary
          label={t<string>('defer')}
          progress={{
            total: blockEnd,
            value: blockProgress,
            withTime: true
          }}
        />
      )}
      <CardSummary label={t<string>('total')}>
        <FormatBalance value={total} />
      </CardSummary>
    </SummaryBox>
  );
}

export default React.memo(Header);
