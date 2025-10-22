import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, ChangeEvent, useTransition } from 'react';
import { FaMale, FaFemale } from 'react-icons/fa';
import {useFilterStore} from './useFilterStore';
import {usePaginationStore} from './usePaginationStore';
import { type Selection } from '@/components/ui/heroui';

export const useFilters = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { filters, setFilters } = useFilterStore();

  const { pageNumber, pageSize, setPage, totalCount } = usePaginationStore(
    (state) => ({
      pageNumber: state.pagination.pageNumber,
      pageSize: state.pagination.pageSize,
      setPage: state.setPage,
      totalCount: state.pagination.totalCount,
    })
  );

  const { gender, ageRange, orderBy, withPhoto } = filters;

  useEffect(() => {
    if (gender || ageRange || orderBy || withPhoto) {
      setPage(1);
    }
  }, [gender, ageRange, orderBy, withPhoto, setPage]);

  useEffect(() => {
    startTransition(() => {
      const searchParams = new URLSearchParams();
      if (gender) searchParams.set('gender', gender.join(','));
      if (ageRange) searchParams.set('ageRange', ageRange.toString());
      if (orderBy) searchParams.set('orderBy', orderBy);
      if (pageSize) searchParams.set('pageSize', pageSize.toString());
      if (pageNumber) searchParams.set('pageNumber', pageNumber.toString());

      searchParams.set('withPhoto', withPhoto.toString());
      router.replace(`${pathname}?${searchParams}`);
    });
  }, [
    gender,
    pathname,
    ageRange,
    orderBy,
    pageSize,
    pageNumber,
    withPhoto,
    router,
  ]);

  const orderByList = [
    { label: 'Last Active', value: ' updated' },
    { label: 'Newest Members', value: 'createdAt' },
  ];

  const genderList = [
    { value: 'male', icon: FaMale },
    { value: 'female', icon: FaFemale },
  ];

  const handleAgeSelect = (value: number[]) => {
    setFilters('ageRange', value);
  };

  const handleOrderSelect = (value: Selection) => {
    if (value instanceof Set) {
      setFilters('orderBy', value.values().next().value);
    }
  };

  const handleGenderSelect = (value: string) => {
    if (gender.includes(value))
      setFilters(
        'gender',
        gender.filter((genderVal) => genderVal !== value)
      );
    else setFilters('gender', [...gender, value]);
  };

  const handleWithPhotoToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters('withPhoto', e.target.checked);
  };

  return {
    selectWithPhoto: handleWithPhotoToggle,
    selectGender: handleGenderSelect,
    selectOrder: handleOrderSelect,
    selectAge: handleAgeSelect,
    filters,
    totalCount,
    isPending,
    orderByList,
    genderList,
  };
};
