// Copyright 2017-2021 @godechain/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { u32 } from '@godechain/types';
import type { ActiveGiltsTotal, BalanceOf } from '@godechain/types/interfaces';
import type { GiltInfo, QueueTotal } from './types';

import { useMemo } from 'react';

import { createNamedHook, useApi, useCallMulti } from '@godechain/react-hooks';
import { BN_ONE } from '@godechain/util';

interface State {
  info?: GiltInfo;
}

const optGiltInfo = {
  defaultValue: {} as GiltInfo,
  transform: ([activeTotal, queueTotals]: [ActiveGiltsTotal, [u32, BalanceOf][]]): GiltInfo => ({
    activeIndex: activeTotal.index.isZero()
      ? null
      : activeTotal.index.sub(BN_ONE),
    activeTotal,
    queueTotals: queueTotals
      .map(([numItems, balance], index): QueueTotal => ({ balance, index: index + 1, numItems }))
      .filter(({ balance }) => !balance.isZero())
  })
};

function useInfoImpl (): State {
  const { api } = useApi();
  const info = useCallMulti<GiltInfo>([
    api.query.gilt.activeTotal,
    api.query.gilt.queueTotals
  ], optGiltInfo);

  // useEffect((): void => {
  //   info.activeIndex &&
  //     api.query.gilt.active
  //       .entries()
  //       .then((value) => console.log(JSON.stringify(value)))
  //       .catch(console.error);
  // }, [api, info?.activeIndex]);

  return useMemo(
    () => ({ info }),
    [info]
  );
}

export default createNamedHook('useInfo', useInfoImpl);
