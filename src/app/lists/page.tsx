import React from 'react';
import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from '../actions/likeActions';
import ListsTab from './ListsTab';
export default async function ListsPage({
  searchParams,
}: {
  searchParams: Promise<{ type: string }>;
}) {
  const likeIds = await fetchCurrentUserLikeIds();
  const { type = 'source' } = await searchParams;
  console.log('searchparam :::', searchParams);
  console.log('type :::', type);
  console.log('likedIds :::', likeIds);

  const members = await fetchLikedMembers(type);

  return (
    <div>
      <ListsTab members={members} likeIds={likeIds} />
    </div>
  );
}
