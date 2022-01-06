// Copyright 2017-2021 @godechain/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';

import { Tabs } from '@godechain/react-components';

import Overview from './Overview';
import { useTranslation } from './translate';

interface Props {
  basePath: string;
  className?: string;
}

function GiltApp ({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const tabsRef = useRef([
    {
      isRoot: true,
      name: 'overview',
      text: t<string>('Overview')
    }
  ]);

  return (
    <main className={className}>
      <Tabs
        basePath={basePath}
        items={tabsRef.current}
      />
      <Switch>
        <Route>
          <Overview />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(GiltApp);
