// Copyright 2017-2021 @godechain/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { LeasePeriod } from '../types';

import React, { useMemo } from 'react';

import { BlockToTime } from '@godechain/react-query';
import { BN_ONE, bnToBn } from '@godechain/util';

interface Props {
  children?: React.ReactNode;
  className?: string;
  leasePeriod?: LeasePeriod | null;
  value?: number | BN | null;
}

function LeaseBlocks ({ children, className, leasePeriod, value }: Props): React.ReactElement<Props> | null {
  const blocks = useMemo(
    () => leasePeriod && value &&
      bnToBn(value)
        .sub(BN_ONE)
        .imul(leasePeriod.length)
        .iadd(leasePeriod.remainder),
    [leasePeriod, value]
  );

  if (!leasePeriod || !blocks) {
    return null;
  }

  return (
    <BlockToTime
      className={className}
      value={blocks}
    >
      {children}
    </BlockToTime>
  );
}

export default React.memo(LeaseBlocks);
