// Copyright 2017-2021 @godechain/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ApiProps } from '@godechain/react-api/types';

import { useContext } from 'react';

import { ApiContext } from '@godechain/react-api';

import { createNamedHook } from './createNamedHook';

function useApiImpl (): ApiProps {
  return useContext(ApiContext);
}

export const useApi = createNamedHook('useApi', useApiImpl);
