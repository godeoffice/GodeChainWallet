// Copyright 2017-2021 @godechain/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { VoteThreshold } from '@godechain/types/interfaces';

import { useEffect, useState } from 'react';

import { createNamedHook, useApi, useCall } from '@godechain/react-hooks';
import { BN_ZERO } from '@godechain/util';

import { approxChanges } from './util';

interface Result {
  changeAye: BN;
  changeNay: BN;
}

function useChangeCalcImpl (threshold: VoteThreshold, votedAye: BN, votedNay: BN, votedTotal: BN): Result {
  const { api } = useApi();
  const sqrtElectorate = useCall<BN>(api.derive.democracy.sqrtElectorate);
  const [result, setResult] = useState<Result>({ changeAye: BN_ZERO, changeNay: BN_ZERO });

  useEffect((): void => {
    sqrtElectorate && setResult(
      approxChanges(threshold, sqrtElectorate, { votedAye, votedNay, votedTotal })
    );
  }, [sqrtElectorate, threshold, votedAye, votedNay, votedTotal]);

  return result;
}

export default createNamedHook('useChangeCalc', useChangeCalcImpl);