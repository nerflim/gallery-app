import { PER_PAGE } from '../constant/filters';
import httpClient from '../utils/httpClient';

export const getPhotos = (params?: any) => httpClient.get(`/photos`, { params: { per_page: PER_PAGE, page: 1, ...params } }).then(({ data }) => data);

export const searchPhotos = (params: any) =>
  httpClient
    .get(`/search/photos`, {
      params: { per_page: PER_PAGE, page: 1, ...params },
    })
    .then(({ data }) => data);

export const getPhotoStats = (id: string) => httpClient.get(`/photos/${id}/statistics`).then(({ data }) => data);
