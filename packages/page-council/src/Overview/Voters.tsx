// Copyright 2017-2021 @godechain/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId, Balance } from '@godechain/types/interfaces';

import React from 'react';

import { AddressMini, Expander } from '@godechain/react-components';
import { FormatBalance } from '@godechain/react-query';
import { formatNumber } from '@godechain/util';

interface Props {
  balance?: Balance;
  voters?: AccountId[];
}

function Voters ({ balance, voters }: Props): React.ReactElement<Props> {
  if (!balance || !voters || !voters.length) {
    return <><td className='all number' /><td className='number' /></>;
  }

  return (
    <>
      <td className='all expand'>
        <Expander summary={<FormatBalance value={balance} />}>
          {voters.map((who): React.ReactNode =>
            <AddressMini
              key={who.toString()}
              value={who}
              withLockedVote
            />
          )}
        </Expander>
      </td>
      <td className='number'>
        {formatNumber(voters.length)}
      </td>
    </>
  );
}

export default React.memo(Voters);
