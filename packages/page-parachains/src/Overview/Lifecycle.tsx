// Copyright 2017-2021 @godechain/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { godechainRuntimeParachainsParasParaLifecycle } from '@godechain/types/lookup';
import type { QueuedAction } from '../types';

import React from 'react';

import { SessionToTime } from '@godechain/react-query';

interface Props {
  lifecycle: godechainRuntimeParachainsParasParaLifecycle | null;
  nextAction?: QueuedAction;
}

function Lifecycle ({ lifecycle, nextAction }: Props): React.ReactElement<Props> | null {
  return lifecycle && (
    <>
      {lifecycle.toString()}
      {nextAction && (
        <SessionToTime value={nextAction.sessionIndex} />
      )}
    </>
  );
}

export default React.memo(Lifecycle);
