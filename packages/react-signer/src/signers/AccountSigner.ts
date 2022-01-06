// Copyright 2017-2021 @godechain/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Signer, SignerResult } from '@godechain/api/types';
import type { KeyringPair } from '@godechain/keyring/types';
import type { Registry, SignerPayloadJSON } from '@godechain/types/types';

import { lockAccount } from '../util';

let id = 0;

export default class AccountSigner implements Signer {
  readonly #keyringPair: KeyringPair;
  readonly #registry: Registry;

  constructor (registry: Registry, keyringPair: KeyringPair) {
    this.#keyringPair = keyringPair;
    this.#registry = registry;
  }

  public async signPayload (payload: SignerPayloadJSON): Promise<SignerResult> {
    return new Promise((resolve): void => {
      const signed = this.#registry.createType('ExtrinsicPayload', payload, { version: payload.version }).sign(this.#keyringPair);

      lockAccount(this.#keyringPair);
      resolve({ id: ++id, ...signed });
    });
  }
}