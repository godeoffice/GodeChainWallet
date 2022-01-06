// Copyright 2017-2020 @godechain/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveCollectiveProposal } from '@godechain/api-derive/types';

import { ApiPromise } from '@godechain/api';
import { SubmittableExtrinsic } from '@godechain/api/types';
import { aHash } from '@godechain/test-support/creation/hashes';
import { alice, bob } from '@godechain/test-support/keyring/addresses';

export interface ProposalFactory {
  aProposal: (extrinsic: SubmittableExtrinsic<'promise'>, ayes?: string[], nays?: string[]) => DeriveCollectiveProposal
}

export function proposalFactory (api: ApiPromise): ProposalFactory {
  const registry = api.registry;

  return {
    aProposal: (extrinsic, ayes = [alice], nays = [bob]) => ({
      hash: aHash(),
      proposal: registry.createType('Proposal', extrinsic),
      votes: registry.createType('Votes', {
        ayes: ayes,
        index: 0,
        nays: nays,
        threshold: 4
      })
    })
  };
}
