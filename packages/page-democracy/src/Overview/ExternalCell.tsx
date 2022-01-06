// Copyright 2017-2021 @godechain/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveProposalImage } from '@godechain/api-derive/types';
import type { Hash } from '@godechain/types/interfaces';

import React from 'react';

import { CallExpander } from '@godechain/react-components';
import { useApi, useCall } from '@godechain/react-hooks';
import { Holder } from '@godechain/react-params';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  value: Hash;
}

function ExternalCell ({ className = '', value }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const preimage = useCall<DeriveProposalImage>(api.derive.democracy.preimage, [value]);

  if (!preimage?.proposal) {
    return null;
  }

  return (
    <Holder
      className={className}
      withBorder
      withPadding
    >
      <CallExpander
        labelHash={t<string>('proposal hash')}
        value={preimage.proposal}
        withHash
      />
    </Holder>
  );
}

export default React.memo(ExternalCell);
