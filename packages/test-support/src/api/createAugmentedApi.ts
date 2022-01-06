// Copyright 2017-2021 @godechain/test-support authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiPromise, WsProvider } from '@godechain/api';
import { Metadata, TypeRegistry } from '@godechain/types';
import metaStatic from '@godechain/types-support/metadata/static-substrate';

export function createAugmentedApi (): ApiPromise {
  const registry = new TypeRegistry();
  const metadata = new Metadata(registry, metaStatic);

  registry.setMetadata(metadata);

  const api = new ApiPromise({ provider: new WsProvider('ws://', false), registry });

  api.injectMetadata(metadata, true);

  return api;
}
