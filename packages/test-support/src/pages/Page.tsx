// Copyright 2017-2021 @godechain/page-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { queryByAttribute, render, RenderResult, screen } from '@testing-library/react';
import BN from 'bn.js';
import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import AccountSidebar from '@godechain/app-accounts/Sidebar';
import { lightTheme } from '@godechain/apps/themes';
import { godechain_GENESIS } from '@godechain/apps-config';
import { ApiContext } from '@godechain/react-api';
import { ApiProps } from '@godechain/react-api/types';
import { QueueProvider } from '@godechain/react-components/Status/Context';
import { PartialQueueTxExtrinsic, QueueProps, QueueTxExtrinsicAdd } from '@godechain/react-components/Status/types';
import { UseAccountInfo } from '@godechain/react-hooks/types';
import { mockApiHooks } from '@godechain/test-support/utils/mockApiHooks';
import { TypeRegistry } from '@godechain/types/create';
import { keyring } from '@godechain/ui-keyring';

import { alice, bob, charlie, ferdie } from '../keyring';
import { Table } from '../pagesElements';
import { AccountOverrides, mockAccountHooks } from '../utils/accountDefaults';

let queueExtrinsic: (value: PartialQueueTxExtrinsic) => void;

class NotYetRendered extends Error {
}

jest.mock('@godechain/react-hooks/useAccounts', () => ({
  useAccounts: () => mockAccountHooks.useAccounts
}));

jest.mock('@godechain/react-hooks/useAccountInfo', () => {
  // eslint-disable-next-line func-call-spacing
  const actual = jest.requireActual<{useAccountInfo: (address: string) => UseAccountInfo}>('@godechain/react-hooks/useAccountInfo');

  return ({
    useAccountInfo: (address: string) => {
      const mockInfo = mockAccountHooks.accountsMap[address];

      return mockInfo
        ? {
          ...actual.useAccountInfo(address),
          flags: { ...actual.useAccountInfo(address).flags, ...(mockInfo.info.flags) },
          identity: {
            ...actual.useAccountInfo(address).identity,
            ...(mockInfo.info.identity),
            judgements: [
              ...(actual.useAccountInfo(address).identity?.judgements || []),
              ...(mockApiHooks.judgements || [])
            ]
          },
          tags: [...actual.useAccountInfo(address).tags, ...(mockInfo.info.tags)]
        }
        : actual.useAccountInfo(address);
    }
  });
});

jest.mock('@godechain/react-hooks/useLoadingDelay', () => ({
  useLoadingDelay: () => false
}));

jest.mock('@godechain/react-hooks/useBalancesAll', () => ({
  useBalancesAll: (address: string) => mockAccountHooks.accountsMap[address].balance
}));

jest.mock('@godechain/react-hooks/useStakingInfo', () => ({
  useStakingInfo: (address: string) => mockAccountHooks.accountsMap[address].staking
}));

jest.mock('@godechain/react-hooks/useBestNumber', () => ({
  useBestNumber: () => 1
}));

jest.mock('@godechain/react-hooks/useSubidentities', () => ({
  useSubidentities: () => mockApiHooks.subs
}));

jest.mock('@godechain/app-accounts/Accounts/useMultisigApprovals', () => ({
  __esModule: true,
  default: () => mockApiHooks.multisigApprovals
}));

jest.mock('@godechain/react-hooks/useDelegations', () => ({
  useDelegations: () => mockApiHooks.delegations
}));

jest.mock('@godechain/react-hooks/useProxies', () => ({
  useProxies: () => mockApiHooks.proxies
}));

jest.mock('@godechain/react-hooks/useSubidentities', () => ({
  useSubidentities: () => mockApiHooks.subs
}));

jest.mock('@godechain/react-hooks/useRegistrars', () => ({
  useRegistrars: () => ({
    isRegistrar: false,
    registrars: mockApiHooks.registrars
  })
}));

export abstract class Page {
  private renderResult?: RenderResult;
  protected readonly defaultAddresses = [alice, bob, charlie, ferdie];

  protected constructor (private readonly overview: React.ReactElement, private readonly rowClassName: string) {
    this.overview = overview;
    this.rowClassName = rowClassName;
  }

  render (accounts: [string, AccountOverrides][]): void {
    mockAccountHooks.setAccounts(accounts);

    accounts.forEach(([address, { meta }]) => {
      keyring.addExternal(address, meta);
    });

    const noop = () => Promise.resolve(() => { /**/ });
    const mockApi: ApiProps = {
      api: {
        consts: {
          babe: {
            expectedBlockTime: new BN(1)
          },
          democracy: {
            enactmentPeriod: new BN(1)
          },
          proxy: {
            proxyDepositBase: new BN(1),
            proxyDepositFactor: new BN(1)
          }
        },
        createType: () => ({
          defKeys: []
        }),
        derive: {
          accounts: {
            info: noop
          },
          balances: {
            all: noop
          },
          chain: {
            bestNumber: noop
          },
          democracy: {
            locks: noop
          },
          staking: {
            account: noop
          }
        },
        genesisHash: new TypeRegistry().createType('Hash', godechain_GENESIS),
        query: {
          democracy: {
            votingOf: noop
          },
          identity: {
            identityOf: noop
          }
        },
        registry: {
          chainDecimals: [12],
          chainTokens: ['Unit'],
          lookup: {
            names: []
          }
        },
        tx: {
          council: {},
          democracy: {
            delegate: noop
          },
          multisig: {
            approveAsMulti: Object.assign(noop, { meta: { args: [] } })
          },
          proxy: {
            removeProxies: noop
          },
          utility: noop
        }
      },
      systemName: 'substrate'
    } as unknown as ApiProps;

    queueExtrinsic = jest.fn() as QueueTxExtrinsicAdd;
    const queue = {
      queueExtrinsic
    } as QueueProps;

    this.renderResult = render(
      <>
        <div id='tooltips' />
        <Suspense fallback='...'>
          <QueueProvider value={queue}>
            <MemoryRouter>
              <ThemeProvider theme={lightTheme}>
                <ApiContext.Provider value={mockApi}>
                  <AccountSidebar>
                    {React.cloneElement(this.overview, { onStatusChange: noop }) }
                  </AccountSidebar>
                </ApiContext.Provider>
              </ThemeProvider>
            </MemoryRouter>
          </QueueProvider>
        </Suspense>
      </>
    );
  }

  async getTable (): Promise<Table> {
    this.assertRendered();

    return new Table(await screen.findByRole('table'), this.rowClassName);
  }

  clearAccounts (): void {
    this.defaultAddresses.forEach((address) => keyring.forgetAccount(address));
  }

  getById (id: string | RegExp): HTMLElement | null {
    this.assertRendered();
    const getById = queryByAttribute.bind(null, 'id');

    return getById(this.renderResult?.container ?? fail('Page render failed'), id);
  }

  protected assertRendered (): void {
    if (this.renderResult === undefined) {
      throw new NotYetRendered();
    }
  }
}
