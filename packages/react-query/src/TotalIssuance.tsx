// Copyright 2017-2021 @godechain/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { useApi, useCall } from '@godechain/react-hooks';

import FormatBalance from './FormatBalance';

interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
}

function TotalIssuance ({ children, className = '', label }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const totalIssuance = useCall<string>(api.query.balances?.totalIssuance);

  return (
    <div className={className}>
      {label || ''}
      <FormatBalance
        value={totalIssuance}
        withSi
      />
      {children}
    </div>
  );
}

export default React.memo(TotalIssuance);
