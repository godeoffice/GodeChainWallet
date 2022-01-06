// Copyright 2017-2021 @godechain/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { UseTranslationResponse } from 'react-i18next';

import { useTranslation as useTranslationBase } from 'react-i18next';

export function useTranslation (): UseTranslationResponse<'app-settings', undefined> {
  return useTranslationBase('app-settings');
}
