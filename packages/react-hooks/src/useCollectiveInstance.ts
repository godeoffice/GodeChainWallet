// Copyright 2017-2021 @godechain/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CollectiveType } from './types';

import { useMemo } from 'react';

import { useApi } from '@godechain/react-hooks';
import { isFunction } from '@godechain/util';

import { createNamedHook } from './createNamedHook';

function useCollectiveInstanceImpl (instanceType: CollectiveType, instanceIndex?: number): CollectiveType | null {
  const { api } = useApi();

  return useMemo(
    (): CollectiveType | null => {
      const index = instanceIndex || 0;
      const instances = api.registry.getModuleInstances(api.runtimeVersion.specName.toString(), instanceType);
      const instance = instances && (index < instances.length)
        ? instances[index] as 'council'
        : instanceType;

      return api.tx[instance] && isFunction(api.tx[instance].close)
        ? instance
        : null;
    },
    [api, instanceIndex, instanceType]
  );
}

export const useCollectiveInstance = createNamedHook('useCollectiveInstance', useCollectiveInstanceImpl);
