// Copyright 2017-2021 @godechain/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component, { useCounter } from '@godechain/app-treasury';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: [
        'tx.treasury.proposeSpend'
      ]
    },
    group: 'governance',
    icon: 'gem',
    name: 'treasury',
    text: t('nav.treasury', 'Treasury', { ns: 'apps-routing' }),
    useCounter
  };
}
