// Copyright 2017-2021 @godechain/test-support authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiPromise } from '@godechain/api/promise';
import { WsProvider } from '@godechain/rpc-provider';
import { SUBSTRATE_PORT } from '@godechain/test-support/substrate';

export async function createApi (port: number = SUBSTRATE_PORT): Promise<ApiPromise> {
  process.env.NODE_ENV = 'test';

  const provider = new WsProvider(`ws://127.0.0.1:${port}`);

  const api = await ApiPromise.create({ provider });

  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);

  console.log(`You are connected to chain ${chain.toString()} using ${nodeName.toString()} v${nodeVersion.toString()}`);

  return api;
}
