// Copyright 2017-2021 @godechain/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SubmittableExtrinsicFunction } from '@godechain/api/promise/types';
import type { InjectedExtension } from '@godechain/extension-inject/types';

import { ApiPromise } from '@godechain/api/promise';

// helpers for HOC props
export type OmitProps<T, K> = Pick<T, Exclude<keyof T, K>>;
export type SubtractProps<T, K> = OmitProps<T, keyof K>;

export interface BareProps {
  className?: string;
}

export interface ApiState {
  apiDefaultTx: SubmittableExtrinsicFunction;
  apiDefaultTxSudo: SubmittableExtrinsicFunction;
  hasInjectedAccounts: boolean;
  isApiReady: boolean;
  isDevelopment: boolean;
  isEthereum: boolean;
  specName: string;
  specVersion: string;
  systemChain: string;
  systemName: string;
  systemVersion: string;
}

export interface ApiProps extends ApiState {
  api: ApiPromise;
  apiError: string | null;
  apiUrl?: string;
  extensions?: InjectedExtension[];
  isApiConnected: boolean;
  isApiInitialized: boolean;
  isElectron: boolean;
  isWaitingInjected: boolean;
}

export interface OnChangeCbObs {
  next: (value?: any) => any;
}

export type OnChangeCbFn = (value?: any) => any;
export type OnChangeCb = OnChangeCbObs | OnChangeCbFn;

export interface ChangeProps {
  callOnResult?: OnChangeCb;
}

export interface CallState {
  callResult?: unknown;
  callUpdated?: boolean;
  callUpdatedAt?: number;
}

export type CallProps = ApiProps & CallState;

export interface BaseProps<T> extends BareProps, CallProps, ChangeProps {
  children?: React.ReactNode;
  label?: string;
  render?: (value?: T) => React.ReactNode;
}

export type Formatter = (value?: any) => string;

export type Environment = 'web' | 'app';
