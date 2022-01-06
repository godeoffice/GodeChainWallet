// Copyright 2017-2021 @godechain/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Compact, Option } from '@godechain/types';
import type { ProposalIndex, TreasuryProposal } from '@godechain/types/interfaces';
import type { TypeDef } from '@godechain/types/types';

import React, { useEffect, useState } from 'react';

import { InputAddress, InputBalance } from '@godechain/react-components';
import { useApi, useCall } from '@godechain/react-hooks';
import Params from '@godechain/react-params';
import { getTypeDef } from '@godechain/types/create';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  value: Compact<ProposalIndex>;
}

interface Param {
  name: string;
  type: TypeDef;
}

interface Value {
  isValid: boolean;
  value: TreasuryProposal;
}

interface ParamState {
  params: Param[];
  values: Value[];
}

const DEFAULT_PARAMS: ParamState = { params: [], values: [] };

const transformProposal = {
  transform: (optProp: Option<TreasuryProposal>) => optProp.unwrapOr(null)
};

function TreasuryCell ({ className = '', value }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const [proposalId] = useState(() => value.unwrap());
  const proposal = useCall<TreasuryProposal | null>(api.query.treasury.proposals, [proposalId], transformProposal);
  const [{ params, values }, setExtracted] = useState<ParamState>(DEFAULT_PARAMS);

  useEffect((): void => {
    proposal && setExtracted({
      params: [{
        name: 'proposal',
        type: getTypeDef('TreasuryProposal')
      }],
      values: [{
        isValid: true,
        value: proposal
      }]
    });
  }, [proposal]);

  if (!proposal) {
    return null;
  }

  return (
    <div className={className}>
      <Params
        isDisabled
        params={params}
        values={values}
      >
        <InputAddress
          defaultValue={proposal.beneficiary}
          isDisabled
          label={t<string>('beneficiary')}
        />
        <InputBalance
          defaultValue={proposal.value}
          isDisabled
          label={t<string>('payout')}
        />
      </Params>
    </div>
  );
}

export default React.memo(TreasuryCell);
