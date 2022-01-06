// Copyright 2017-2021 @godechain/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId, BalanceOf } from '@godechain/types/interfaces';
import type { PalletSocietyBidKind } from '@godechain/types/lookup';

import React from 'react';

import { AddressSmall } from '@godechain/react-components';
import { FormatBalance } from '@godechain/react-query';

import BidType from '../Candidates/BidType';

interface Props {
  balance?: BalanceOf;
  bid?: PalletSocietyBidKind;
  value: AccountId;
}

function Suspension ({ balance, bid, value }: Props): React.ReactElement<Props> {
  return (
    <tr>
      <td className='address all'>
        <AddressSmall value={value} />
      </td>
      <BidType value={bid} />
      <td className='number'>
        {balance && (
          <FormatBalance value={balance} />
        )}
      </td>
    </tr>
  );
}

export default React.memo(Suspension);
