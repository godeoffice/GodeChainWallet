// Copyright 2017-2021 @godechain/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { StorageKey } from '@godechain/types';
import type { ParaId, SessionIndex } from '@godechain/types/interfaces';
import type { Proposals } from './types';

import { useMemo } from 'react';

import { createNamedHook, useApi, useCallMulti, useEventTrigger, useIsMountedRef, useMapEntries, useMapKeys } from '@godechain/react-hooks';

type MultiQuery = [SessionIndex | undefined, ParaId[] | undefined];

interface Scheduled {
  scheduledIds: ParaId[];
  sessionIndex: SessionIndex;
}

const optionsMulti = {
  defaultValue: [undefined, undefined] as MultiQuery
};

function extractProposalIds (keys: StorageKey<[ParaId]>[]): ParaId[] {
  return keys.map(({ args: [id] }) => id);
}

function extractScheduled (entries: [StorageKey<[SessionIndex]>, ParaId[]][]): Scheduled[] {
  return entries.map(([{ args: [sessionIndex] }, scheduledIds]) => ({
    scheduledIds,
    sessionIndex
  }));
}

function useProposalsImpl (): Proposals | undefined {
  const { api } = useApi();
  const mountedRef = useIsMountedRef();
  const trigger = useEventTrigger([api.events.proposeParachain?.ProposeParachain]);
  const proposalIds = useMapKeys(api.query.proposeParachain?.proposals, { at: trigger.blockHash, transform: extractProposalIds });
  const scheduled = useMapEntries(api.query.proposeParachain?.scheduledProposals, { at: trigger.blockHash, transform: extractScheduled });
  const [sessionIndex, approvedIds] = useCallMulti<MultiQuery>([
    api.query.session.currentIndex,
    api.query.proposeParachain?.approvedProposals
  ], optionsMulti);

  return useMemo(
    () => approvedIds && sessionIndex && proposalIds && scheduled && mountedRef.current
      ? {
        approvedIds,
        proposalIds,
        scheduled: scheduled.filter((s) => s.sessionIndex.gt(sessionIndex))
      }
      : undefined,
    [approvedIds, mountedRef, proposalIds, sessionIndex, scheduled]
  );
}

export default createNamedHook('useProposals', useProposalsImpl);
