'use client';

import { Spinner } from '@heroui/react';
import React from 'react';

export default function Loading({ label }: { label?: string }) {
  return (
    <div className='fixed inset-0 flex justify-center items-center'>
      <Spinner color='default' label={label || 'Loading...'} />
    </div>
  );
}
