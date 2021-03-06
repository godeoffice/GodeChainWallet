// Copyright 2017-2021 @godechain/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { PalletSocietyBid } from '@godechain/types/lookup';

import React, { useRef } from 'react';

import { Table } from '@godechain/react-components';
import { useApi, useCall } from '@godechain/react-hooks';

import { useTranslation } from '../translate';
import BidRow from './Bid';

interface Props {
  className?: string;
}

function Bids ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const bids = useCall<PalletSocietyBid[]>(api.query.society.bids);

  const headerRef = useRef([
    [t('bids'), 'start'],
    [t('bid kind'), 'start', 2],
    [t('value')],
    [t('tip')],
    []
  ]);

  return (
    <Table
      className={className}
      empty={bids && t<string>('No bids')}
      header={headerRef.current}
    >
      {bids?.map((bid, index): React.ReactNode => (
        <BidRow
          index={index}
          key={bid.who.toString()}
          value={bid}
        />
      ))}
    </Table>
  );
}

export default React.memo(Bids);
