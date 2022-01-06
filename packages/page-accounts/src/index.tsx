// Copyright 2017-2021 @godechain/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props } from '@godechain/react-components/types';

import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';

import { HelpOverlay, Tabs } from '@godechain/react-components';
import { useAccounts, useIpfs } from '@godechain/react-hooks';

import basicMd from './md/basic.md';
import Accounts from './Accounts';
import { useTranslation } from './translate';
import useCounter from './useCounter';
import Vanity from './Vanity';

export { useCounter };

const HIDDEN_ACC = ['vanity'];

function AccountsApp ({ basePath, onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { hasAccounts } = useAccounts();
  const { isIpfs } = useIpfs();

  const tabsRef = useRef([
    {
      isRoot: true,
      name: 'overview',
      text: t<string>('My accounts')
    },
    {
      name: 'vanity',
      text: t<string>('Vanity generator')
    }
  ]);

  return (
    <main className='accounts--App'>
      <HelpOverlay md={basicMd as string} />
      <Tabs
        basePath={basePath}
        hidden={(hasAccounts && !isIpfs) ? undefined : HIDDEN_ACC}
        items={tabsRef.current}
      />
      <Switch>
        <Route path={`${basePath}/vanity`}>
          <Vanity
            basePath={basePath}
            onStatusChange={onStatusChange}
          />
        </Route>
        <Route>
          <Accounts
            basePath={basePath}
            onStatusChange={onStatusChange}
          />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(AccountsApp);
