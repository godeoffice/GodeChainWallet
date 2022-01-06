// Copyright 2017-2021 @godechain/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { QueueTx } from '@godechain/react-components/Status/types';

import React from 'react';

import { Output } from '@godechain/react-components';
import valueToText from '@godechain/react-params/valueToText';
import { isUndefined } from '@godechain/util';

interface Props {
  queue: QueueTx[];
}

function Results ({ queue = [] }: Props): React.ReactElement<Props> | null {
  const filtered = queue
    .filter(({ error, result }) => !isUndefined(error) || !isUndefined(result))
    .reverse();

  if (!filtered.length) {
    return null;
  }

  return (
    <section className='rpc--Results'>
      {filtered.map(({ error, id, result, rpc: { method, section } }): React.ReactNode => (
        <Output
          isError={!!error}
          key={id}
          label={`${id}: ${section}.${method}`}
          value={
            error
              ? error.message
              : <pre>{valueToText('', result as null, false)}</pre>
          }
        />
      ))}
    </section>
  );
}

export default React.memo(Results);
