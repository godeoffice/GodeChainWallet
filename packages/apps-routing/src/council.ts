// Copyright 2017-2021 @godechain/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component, { useCounter } from '@godechain/app-council';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: [
        'query.council.prime'
      ],
      needsApiInstances: true
    },
    group: 'governance',
    icon: 'building',
    name: 'council',
    text: t('nav.council', 'Council', { ns: 'apps-routing' }),
    useCounter
  };
}
