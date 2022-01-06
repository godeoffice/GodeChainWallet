// Copyright 2017-2021 @godechain/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveSociety, DeriveSocietyMember } from '@godechain/api-derive/types';
import type { SocietyVote } from '@godechain/types/interfaces';
import type { VoteType } from '../types';

import React, { useRef } from 'react';

import { AddressSmall, Table } from '@godechain/react-components';
import { useApi, useCall } from '@godechain/react-hooks';

import { useTranslation } from '../translate';
import DefenderVoting from './DefenderVoting';
import Votes from './Votes';

interface Props {
  className?: string;
  info?: DeriveSociety;
  isMember: boolean;
  ownMembers: string[];
}

const transformVotes = {
  transform: (members: DeriveSocietyMember[]): VoteType[] =>
    members
      .filter(({ vote }): boolean => !!vote)
      .map(({ accountId, vote }): VoteType => [accountId.toString(), vote as SocietyVote])
};

function Defender ({ className = '', info, isMember, ownMembers }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const votes = useCall<VoteType[]>(api.derive.society.members, undefined, transformVotes);

  const headerRef = useRef([
    [t('defender'), 'start'],
    [undefined, 'expand'],
    []
  ]);

  if (!info || !info.hasDefender || !info.defender) {
    return null;
  }

  return (
    <Table
      className={className}
      header={headerRef.current}
    >
      <tr>
        <td className='address all'>
          <AddressSmall value={info.defender} />
        </td>
        <Votes votes={votes} />
        <td className='button'>
          <DefenderVoting
            isMember={isMember}
            ownMembers={ownMembers}
          />
        </td>
      </tr>
    </Table>
  );
}

export default React.memo(Defender);
