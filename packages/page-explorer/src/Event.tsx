// Copyright 2017-2021 @godechain/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { EventRecord } from '@godechain/types/interfaces';

import React from 'react';

import { Event as EventDisplay, Expander } from '@godechain/react-components';

interface Props {
  className?: string;
  value: EventRecord;
}

function Event ({ className = '', value: { event } }: Props): React.ReactElement<Props> {
  return (
    <Expander
      className={className}
      summary={`${event.section}.${event.method}`}
      summaryMeta={event.meta}
    >
      <EventDisplay
        className='details'
        value={event}
      />
    </Expander>
  );
}

export default React.memo(Event);
