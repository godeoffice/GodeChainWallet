// Copyright 2017-2021 @godechain/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BlockNumber, BountyStatus } from '@godechain/types/interfaces';

import BN from 'bn.js';
import React, { useMemo } from 'react';

import { useBountyStatus } from '@godechain/app-bounties/hooks';
import { BN_HUNDRED, BN_ZERO } from '@godechain/util';

import { useBounties } from '../hooks';
import { useTranslation } from '../translate';
import BountyInfo from './BountyInfo';

interface Props {
  bestNumber: BlockNumber;
  blocksUntilUpdate?: BN;
  status: BountyStatus;
}

export const BLOCKS_PERCENTAGE_LEFT_TO_SHOW_WARNING = 10;
const BLOCKS_LEFT_TO_SHOW_WARNING = new BN('10000');

function BountyActionMessage ({ bestNumber, blocksUntilUpdate, status }: Props): JSX.Element {
  const { t } = useTranslation();
  const { unlockAt } = useBountyStatus(status);
  const { bountyUpdatePeriod } = useBounties();

  const blocksUntilPayout = useMemo(() => unlockAt?.sub(bestNumber), [bestNumber, unlockAt]);

  const blocksPercentageLeftToShowWarning = bountyUpdatePeriod?.muln(BLOCKS_PERCENTAGE_LEFT_TO_SHOW_WARNING).div(BN_HUNDRED);
  const blocksToShowWarning = blocksPercentageLeftToShowWarning ?? BLOCKS_LEFT_TO_SHOW_WARNING;

  return (
    <div>
      {blocksUntilUpdate?.lte(BN_ZERO) && (
        <BountyInfo
          description={t<string>('Update overdue')}
          type='warning'
        />
      )}
      {blocksUntilUpdate?.lt(blocksToShowWarning) && blocksUntilUpdate?.gt(BN_ZERO) && (
        <BountyInfo
          description={t<string>('Close deadline')}
          type='warning'
        />
      )}
      {status.isApproved && (
        <BountyInfo
          description={t<string>('Waiting for Bounty Funding')}
          type='info'
        />
      )}
      {status.isCuratorProposed && (
        <BountyInfo
          description={t<string>("Waiting for Curator's acceptance")}
          type='info'
        />
      )}
      {blocksUntilPayout?.lt(BN_ZERO) &&
        <BountyInfo
          description={t<string>('Waiting for implementer to claim')}
          type='info'
        />
      }
    </div>
  );
}

export default React.memo(BountyActionMessage);
