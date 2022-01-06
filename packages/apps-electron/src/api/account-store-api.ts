// Copyright 2017-2021 @godechain/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringJson } from '@godechain/ui-keyring/types';

export interface AccountStoreApi {
  all: () => Promise<{ key: string, value: KeyringJson }[]>
  get: (key: string) => Promise<KeyringJson>
  remove: (key: string) => Promise<void>
  set: (key: string, value: KeyringJson) => Promise<void>
}
