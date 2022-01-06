// Copyright 2017-2021 @godechain/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props } from '@godechain/react-components/types';

import React, { useRef } from 'react';

import { useTranslation } from '@godechain/app-contracts/translate';
import { HelpOverlay, Tabs } from '@godechain/react-components';

import introMd from './md/intro.md';
import Contracts from './Contracts';

function ContractsApp ({ basePath, className = '' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const itemsRef = useRef([
    {
      isRoot: true,
      name: 'contracts',
      text: t('Contracts')
    }
  ]);

  return (
    <main className={`contracts--App ${className}`}>
      <HelpOverlay md={introMd as string} />
      <Tabs
        basePath={basePath}
        items={itemsRef.current}
      />
      <Contracts />
    </main>
  );
}

export default React.memo(ContractsApp);
