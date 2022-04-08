import { getPhotos, searchPhotos } from '../../services';

const removeDuplicate = (dataSource: any[], comparison: any[]) => {
  const newData = comparison.filter((item) => !dataSource.some((dItem) => dItem.id === item.id));

  return [...dataSource, ...newData];
};

export const onSearch =
  (
    order: string,
    orientation: string,
    setPage: (data: number) => void,
    setLoading: (data: boolean) => void,
    setPhotos: (data: any[]) => void,
    setTotalPhotos: (data: number) => void,
    setSearch: (data: string) => void
  ) =>
  (query: string) => {
    if (!query.trim()) return setSearch(query);

    const payload: any = {
      query,
      order_by: order,
      page: 1,
    };
    setPage(1);

    if (orientation !== 'any') {
      payload.orientation = orientation;
    }

    setLoading(true);
    searchPhotos(payload)
      .then((res) => {
        setPhotos(res.results);
        setTotalPhotos(res.total);
        setSearch(query);
      })
      .finally(() => setLoading(false));
  };

export const searchLoadMore = (
  query: string,
  order_by: string,
  orientation: string,
  page: number,
  photos: any[],
  setPage: (data: number) => void,
  setPhotos: (data: any[]) => void
) => {
  const payload: any = {
    query,
    order_by,
    page: page + 1,
  };
  setPage(page + 1);

  if (orientation !== 'any') {
    payload.orientation = orientation;
  }

  searchPhotos(payload).then((res) => {
    setPhotos(removeDuplicate(photos, res.results));
  });
};

export const featuredLoadMore = (page: number, photos: any[], setPhotos: (data: any[]) => void, setPage: (data: number) => void) => {
  setPage(page + 1);

  getPhotos({
    page: page + 1,
  }).then((res) => setPhotos(removeDuplicate(photos, res)));
};
