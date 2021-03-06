// Copyright 2017-2020 @godechain/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ApiPromise } from '@godechain/api';
import type { SubmittableExtrinsic } from '@godechain/api/types';
import type { Weight } from '@godechain/types/interfaces';

import { useEffect, useMemo, useState } from 'react';

import { isFunction } from '@godechain/util';

import { createNamedHook } from './createNamedHook';
import { useAccounts } from './useAccounts';
import { useApi } from './useApi';

interface Options {
  batchSize?: number;
  isBatchAll?: boolean;
}

function createBatches (api: ApiPromise, txs: SubmittableExtrinsic<'promise'>[], batchSize: number, isBatchAll = false): SubmittableExtrinsic<'promise'>[] {
  if (batchSize === 1 || !isFunction(api.tx.utility?.batch)) {
    return txs;
  }

  return txs
    .reduce((batches: SubmittableExtrinsic<'promise'>[][], tx): SubmittableExtrinsic<'promise'>[][] => {
      const batch = batches[batches.length - 1];

      if (batch.length >= batchSize) {
        batches.push([tx]);
      } else {
        batch.push(tx);
      }

      return batches;
    }, [[]])
    .map((batch): SubmittableExtrinsic<'promise'> =>
      batch.length === 1
        ? batch[0]
        : isBatchAll && isFunction(api.tx.utility.batchAll)
          ? api.tx.utility.batchAll(batch)
          : api.tx.utility.batch(batch)
    );
}

function useTxBatchImpl (txs?: SubmittableExtrinsic<'promise'>[] | null | false, options?: Options): SubmittableExtrinsic<'promise'>[] | null {
  const { api } = useApi();
  const { allAccounts } = useAccounts();
  const [batchSize, setBatchSize] = useState(Math.floor(options?.batchSize || 64));

  useEffect((): void => {
    txs && txs.length && allAccounts[0] && isFunction(api.rpc.payment?.queryInfo) &&
      txs[0]
        .paymentInfo(allAccounts[0])
        .then((info) => setBatchSize((prev) =>
          info.weight.isZero()
            ? prev
            : Math.floor(
              (
                api.consts.system.blockWeights
                  ? api.consts.system.blockWeights.maxBlock
                  : api.consts.system.maximumBlockWeight as Weight
              )
                .muln(64) // 65% of the block weight on a single extrinsic (64 for safety)
                .div(info.weight)
                .toNumber() / 100
            )
        ))
        .catch(console.error);
  }, [allAccounts, api, options, txs]);

  return useMemo(
    () => txs && txs.length
      ? createBatches(api, txs, batchSize, options?.isBatchAll)
      : null,
    [api, batchSize, options, txs]
  );
}

export const useTxBatch = createNamedHook('useTxBatch', useTxBatchImpl);
