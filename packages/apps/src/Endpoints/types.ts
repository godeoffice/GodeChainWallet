// Copyright 2017-2021 @godechain/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

export interface Network {
  icon?: string;
  isChild?: boolean;
  isLightClient?: boolean;
  isUnreachable?: boolean;
  name: string;
  providers: {
    name: string;
    url: string;
  }[]
}

export interface Group {
  header: React.ReactNode;
  isDevelopment?: boolean;
  isSpaced?: boolean;
  networks: Network[];
}
