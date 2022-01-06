// Copyright 2017-2021 @godechain/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { InputAddress, Labelled } from '@godechain/react-components';
import { Nonce } from '@godechain/react-query';
import { BN_ZERO } from '@godechain/util';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  defaultValue?: string | null;
  isError?: boolean;
  onChange: (accountId: string | undefined | null, accountNonce: BN) => void;
}

function Account ({ className = '', defaultValue, isError, onChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [accountId, setAccountId] = useState<string | null | undefined>(defaultValue);
  const [accountNonce, setAccountNonce] = useState(BN_ZERO);

  useEffect((): void => {
    onChange(accountId, accountNonce);
  }, [accountId, accountNonce, onChange]);

  return (
    <div className={`ui--row ${className}`}>
      <div className='large'>
        <InputAddress
          defaultValue={defaultValue}
          isError={isError}
          label={t<string>('sign data from account')}
          onChange={setAccountId}
          placeholder='0x...'
          type='account'
        />
      </div>
      {accountId && (
        <Labelled
          className='small'
          label={t<string>('with an index of')}
        >
          <Nonce
            callOnResult={setAccountNonce}
            className='ui disabled dropdown selection'
            params={accountId}
          />
        </Labelled>
      )}
    </div>
  );
}

export default React.memo(styled(Account)`
  box-sizing: border-box;
  padding-left: 2em;
`);
