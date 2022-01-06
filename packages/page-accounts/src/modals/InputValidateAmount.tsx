// Copyright 2017-2021 @godechain/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { DeriveBalancesAll } from '@godechain/api-derive/types';
import type { AmountValidateState } from '../Accounts/types';

import React, { useEffect, useState } from 'react';

import { MarkError, MarkWarning } from '@godechain/react-components';
import { useApi, useCall } from '@godechain/react-hooks';
import { BN_ZERO } from '@godechain/util';

import { useTranslation } from '../translate';

interface Props {
  amount?: BN | null;
  delegatingAccount: string | null;
  onError: (state: AmountValidateState | null) => void;
}

function ValidateAmount ({ amount, delegatingAccount, onError }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const delegatingAccountBalance = useCall<DeriveBalancesAll>(api.derive.balances?.all, [delegatingAccount]);
  const [{ error, warning }, setResult] = useState<AmountValidateState>({ error: null, warning: null });

  useEffect((): void => {
    if (delegatingAccountBalance?.freeBalance && amount?.gt(BN_ZERO)) {
      let newError: string | null = null;

      if (amount.gte(delegatingAccountBalance.freeBalance)) {
        newError = t('The maximum amount you can delegate is the amount of funds available on the delegating account.');
      }

      setResult((state): AmountValidateState => {
        const error = state.error !== newError ? newError : state.error;
        const warning = state.warning;

        onError((error || warning) ? { error, warning } : null);

        return { error, warning };
      });
    }
  }, [api, onError, amount, t, delegatingAccountBalance]);

  if (error) {
    return <MarkError content={error} />;
  } else if (warning) {
    return <MarkWarning content={warning} />;
  }

  return null;
}

export default React.memo(ValidateAmount);
