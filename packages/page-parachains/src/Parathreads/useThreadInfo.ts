// Copyright 2017-2021 @godechain/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option } from '@godechain/types';
import type { AccountId, HeadData, ParaId } from '@godechain/types/interfaces';
import type { godechainRuntimeCommonParasRegistrarParaInfo, godechainRuntimeParachainsParasParaGenesisArgs, godechainRuntimeParachainsParasParaLifecycle } from '@godechain/types/lookup';

import { createNamedHook, useApi, useCallMulti } from '@godechain/react-hooks';

import { sliceHex } from '../util';

interface Result {
  headHex: string | null;
  lifecycle: godechainRuntimeParachainsParasParaLifecycle | null;
  manager: AccountId | null;
}

const optMulti = {
  defaultValue: {
    headHex: null,
    lifecycle: null,
    manager: null
  },
  transform: ([optHead, optGenesis, optLifecycle, optInfo]: [Option<HeadData>, Option<godechainRuntimeParachainsParasParaGenesisArgs>, Option<godechainRuntimeParachainsParasParaLifecycle>, Option<godechainRuntimeCommonParasRegistrarParaInfo>]): Result => ({
    headHex: optHead.isSome
      ? sliceHex(optHead.unwrap())
      : optGenesis.isSome
        ? sliceHex(optGenesis.unwrap().genesisHead)
        : null,
    lifecycle: optLifecycle.unwrapOr(null),
    manager: optInfo.isSome
      ? optInfo.unwrap().manager
      : null
  })
};

function useThreadInfoImpl (id: ParaId): Result {
  const { api } = useApi();

  return useCallMulti<Result>([
    [api.query.paras.heads, id],
    [api.query.paras.upcomingParasGenesis, id],
    [api.query.paras.paraLifecycles, id],
    [api.query.registrar.paras, id]
  ], optMulti);
}

export default createNamedHook('useThreadInfo', useThreadInfoImpl);
