// Copyright 2017-2021 @godechain/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Modal from '@godechain/app-parachains/Teleport';

export default function create (t: TFunction): Route {
  return {
    Component: Modal,
    Modal,
    display: {
      isHidden: false,
      needsAccounts: true,
      needsApi: [
        [
          'tx.xcm.teleportAssets',
          'tx.xcmPallet.teleportAssets',
          'tx.godechainXcm.teleportAssets',
          'tx.xcm.limitedTeleportAssets',
          'tx.xcmPallet.limitedTeleportAssets',
          'tx.godechainXcm.limitedTeleportAssets'
        ]
      ],
      needsTeleport: true
    },
    group: 'accounts',
    icon: 'share-square',
    name: 'teleport',
    text: t('nav.teleport', 'Teleport', { ns: 'apps-routing' })
  };
}
