// Copyright 2017-2021 @godechain/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { QueryableStorageEntry } from '@godechain/api/types';
import type { ConstValue } from '@godechain/react-components/InputConsts/types';
import type { RawParams } from '@godechain/react-params/types';

interface Base {
  isConst: boolean;
}

interface IdQuery extends Base {
  id: number;
}

export interface PartialModuleQuery extends Base {
  blockHash: string | null;
  key: QueryableStorageEntry<'promise'>;
  params: RawParams;
}

export type StorageModuleQuery = PartialModuleQuery & IdQuery;

export interface PartialRawQuery extends Base {
  key: Uint8Array;
}

export type StorageRawQuery = PartialRawQuery & IdQuery;

export interface PartialConstQuery extends Base {
  key: ConstValue;
}

export type ConstQuery = PartialConstQuery & IdQuery;

export type QueryTypes = StorageModuleQuery | StorageRawQuery | ConstQuery;

export type ParitalQueryTypes = PartialModuleQuery | PartialRawQuery | PartialConstQuery;

export interface ComponentProps {
  onAdd: (query: ParitalQueryTypes) => void;
}
