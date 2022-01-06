// Copyright 2017-2021 @godechain/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { AccountId, BountyIndex } from '@godechain/types/interfaces';

import React, { useMemo } from 'react';

import { useBounties } from '@godechain/app-bounties/hooks';
import { TxButton } from '@godechain/react-components';
import { useAccounts } from '@godechain/react-hooks';

import { isClaimable } from '../helpers';
import { useTranslation } from '../translate';

interface Props {
  beneficiaryId: AccountId;
  index: BountyIndex;
  payoutDue: BN;
}

function BountyClaimAction ({ beneficiaryId, index, payoutDue }: Props) {
  const { t } = useTranslation();
  const { claimBounty } = useBounties();
  const { allAccounts } = useAccounts();

  const isBountyClaimable = useMemo(
    () => isClaimable(allAccounts, beneficiaryId, payoutDue),
    [allAccounts, beneficiaryId, payoutDue]
  );

  return isBountyClaimable
    ? (
      <TxButton
        accountId={beneficiaryId}
        icon='plus'
        label={t<string>('Claim')}
        params={[index]}
        tx={claimBounty}
      />
    )
    : null;
}

export default React.memo(BountyClaimAction);
