// Copyright 2017-2021 @godechain/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveCollectiveProposal } from '@godechain/api-derive/types';
import type { AccountId, BountyStatus } from '@godechain/types/interfaces';

import React, { useMemo } from 'react';

import { AddressSmall } from '@godechain/react-components';

import Description from '../Description';
import { getProposalToDisplay } from '../helpers/extendedStatuses';
import { useTranslation } from '../translate';
import VotingSummary from './VotingSummary';

interface Props {
  beneficiary?: AccountId;
  proposals?: DeriveCollectiveProposal[];
  status: BountyStatus;
}

function BountyInfos ({ beneficiary, proposals, status }: Props): JSX.Element {
  const { t } = useTranslation();

  const proposalToDisplay = useMemo(() => proposals && getProposalToDisplay(proposals, status), [proposals, status]);

  return (
    <>
      {proposalToDisplay &&
        <VotingSummary
          proposal={proposalToDisplay}
          status={status}
        />
      }
      {beneficiary && (
        <div>
          <AddressSmall value={beneficiary} />
          <Description description={t<string>('Beneficiary')} />
        </div>
      )}
    </>
  );
}

export default React.memo(BountyInfos);
