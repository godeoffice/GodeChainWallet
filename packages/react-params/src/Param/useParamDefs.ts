// Copyright 2017-2021 @godechain/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Registry, TypeDef } from '@godechain/types/types';
import type { ParamDef } from '../types';

import { useEffect, useState } from 'react';

import { createNamedHook } from '@godechain/react-hooks';
import { getTypeDef } from '@godechain/types/create';

function expandDef (registry: Registry, td: TypeDef): TypeDef {
  try {
    return getTypeDef(
      registry.createType(td.type as 'u32').toRawType()
    );
  } catch (e) {
    return td;
  }
}

function useParamDefsImpl (registry: Registry, type: TypeDef): ParamDef[] {
  const [params, setParams] = useState<ParamDef[]>([]);

  useEffect((): void => {
    const typeDef = expandDef(registry, type);

    if (!typeDef.sub) {
      return setParams([]);
    }

    setParams(
      (Array.isArray(typeDef.sub) ? typeDef.sub : [typeDef.sub]).map((td): ParamDef => ({
        length: typeDef.length,
        name: td.name,
        type: td // expandDef(td)
      }))
    );
  }, [registry, type]);

  return params;
}

export default createNamedHook('useParamDefs', useParamDefsImpl);
