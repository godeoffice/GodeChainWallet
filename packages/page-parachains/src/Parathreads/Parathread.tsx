// Copyright 2017-2021 @godechain/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ParaId } from '@godechain/types/interfaces';
import type { LeaseInfo, LeasePeriod, QueuedAction } from '../types';

import React, { useMemo } from 'react';

import { AddressSmall, ParaLink, TxButton } from '@godechain/react-components';
import { useAccounts, useApi } from '@godechain/react-hooks';
import { formatNumber } from '@godechain/util';

import Lifecycle from '../Overview/Lifecycle';
// import ParachainInfo from '../Overview/ParachainInfo';
import Periods from '../Overview/Periods';
import { useTranslation } from '../translate';
import useThreadInfo from './useThreadInfo';

interface Props {
  id: ParaId;
  leasePeriod: LeasePeriod;
  leases: LeaseInfo[];
  nextAction?: QueuedAction;
}

function Parathread ({ id, leasePeriod, leases, nextAction }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const { isAccount } = useAccounts();
  const { headHex, lifecycle, manager } = useThreadInfo(id);

  const periods = useMemo(
    () => leasePeriod?.currentPeriod && leases &&
      leases.map(({ period }) => period),
    [leasePeriod?.currentPeriod, leases]
  );

  const isManager = isAccount(manager?.toString());

  return (
    <tr>
      <td className='number'><h1>{formatNumber(id)}</h1></td>
      <td className='badge'><ParaLink id={id} /></td>
      <td className='address media--1100'>{manager && <AddressSmall value={manager} />}</td>
      <td className='start together hash media--1500'>{headHex}</td>
      <td className='start'>
        <Lifecycle
          lifecycle={lifecycle}
          nextAction={nextAction}
        />
      </td>
      <td className='all' />
      <td className='number no-pad-left'>
        {/* <!-- ParachainInfo id={id} /--> */}
      </td>
      <td className='number together'>
        {leasePeriod && leases && periods && (
          leases.length
            ? (
              <Periods
                fromFirst
                leasePeriod={leasePeriod}
                periods={periods}
              />
            )
            : t('None')
        )}
      </td>
      <td className='button media--900'>
        <TxButton
          accountId={manager}
          icon='times'
          isDisabled={!isManager}
          label={t<string>('Deregister')}
          params={[id]}
          tx={api.tx.registrar.deregister}
        />
      </td>
    </tr>
  );
}

export default React.memo(Parathread);