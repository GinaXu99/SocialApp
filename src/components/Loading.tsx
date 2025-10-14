import { Spinner } from '@/components/ui/heroui';
import React from 'react';

export default function LoadingComponent({ label }: { label?: string }) {
  return (
    <div className='fixed inset-0 flex justify-center items-center'>
      <Spinner color='default' label={label || 'Loading...'} />
    </div>
  );
}
