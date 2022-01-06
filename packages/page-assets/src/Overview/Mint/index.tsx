// Copyright 2017-2021 @godechain/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { PalletAssetsAssetDetails, PalletAssetsAssetMetadata } from '@godechain/types/lookup';

import React from 'react';

import { Button } from '@godechain/react-components';
import { useToggle } from '@godechain/react-hooks';

import { useTranslation } from '../../translate';
import Modal from './Mint';

interface Props {
  className?: string;
  details: PalletAssetsAssetDetails;
  id: BN;
  metadata: PalletAssetsAssetMetadata;
}

function Mint ({ className, details, id, metadata }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [isOpen, toggleOpen] = useToggle();

  return (
    <>
      <Button
        icon='plus'
        isDisabled={metadata.isFrozen.isTrue}
        label={t<string>('Mint')}
        onClick={toggleOpen}
      />
      {isOpen && (
        <Modal
          className={className}
          details={details}
          id={id}
          metadata={metadata}
          onClose={toggleOpen}
        />
      )}
    </>
  );
}

export default React.memo(Mint);
