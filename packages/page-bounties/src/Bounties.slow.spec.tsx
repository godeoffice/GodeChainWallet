// Copyright 2017-2021 @godechain/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@godechain/react-components/i18n';

import { render } from '@testing-library/react';
import BN from 'bn.js';
import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import BountiesApp from '@godechain/app-bounties/index';
import { lightTheme } from '@godechain/apps/themes';
import { Api } from '@godechain/react-api';
import { createApi } from '@godechain/test-support/api';
import { MemoryStore } from '@godechain/test-support/keyring';
import { aliceSigner } from '@godechain/test-support/keyring/signers';
import { WaitForApi } from '@godechain/test-support/react';
import { execute } from '@godechain/test-support/transaction/execute';

const SUBSTRATE_PORT = Number.parseInt(process.env.TEST_SUBSTRATE_PORT || '30333');

const renderBounties = () => {
  const memoryStore = new MemoryStore();

  return render(
    <Suspense fallback='...'>
      <MemoryRouter>
        <ThemeProvider theme={lightTheme}>
          <Api
            apiUrl={`ws://127.0.0.1:${SUBSTRATE_PORT}`}
            isElectron={false}
            store={memoryStore}
          >
            <WaitForApi>
              <div>
                <BountiesApp basePath='/bounties' />
              </div>
            </WaitForApi>
          </Api>
        </ThemeProvider>
      </MemoryRouter>
    </Suspense>
  );
};

describe('--SLOW--: Bounties', () => {
  it('list shows an existing bounty', async () => {
    const api = await createApi();

    await execute(api.tx.bounties.proposeBounty(new BN(500_000_000_000_000), 'a short bounty title'), aliceSigner());

    const { findByText } = renderBounties();

    expect(await findByText('a short bounty title', {}, { timeout: 20_000 })).toBeTruthy();
  });
});
