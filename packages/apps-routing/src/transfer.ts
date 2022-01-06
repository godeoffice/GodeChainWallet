// Copyright 2017-2021 @godechain/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Modal from '@godechain/app-accounts/modals/Transfer';

export default function create (t: TFunction): Route {
  return {
    Component: Modal,
    Modal,
    display: {
      isHidden: false,
      needsAccounts: true,
      needsApi: [
        'tx.balances.transfer'
      ]
    },
    group: 'accounts',
    icon: 'paper-plane',
    name: 'transfer',
    text: t('nav.transfer', 'Transfer', { ns: 'apps-routing' })
  };
}
