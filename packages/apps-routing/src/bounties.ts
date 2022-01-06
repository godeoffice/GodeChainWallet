// Copyright 2017-2021 @godechain/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component, { useCounter } from '@godechain/app-bounties';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: [
        ['tx.bounties.proposeBounty', 'tx.treasury.proposeBounty']
      ]
    },
    group: 'governance',
    icon: 'coins',
    name: 'bounties',
    text: t('nav.bounties', 'Bounties', { ns: 'apps-routing' }),
    useCounter
  };
}
