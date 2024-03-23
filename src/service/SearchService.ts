import axiosInstance from '@/constants/AxiosInstance';
import { Place } from '@/entities/place';
import { Keyword } from '@/entities/search';
import { Studio } from '@/entities/studio';

type ListSearchResultsRequest = {
  keyword: string;
  date: string;
};

type ListSearchResultsResponse = {
  value: Studio[]; // TODO: fix to Place
};

const listSearchResults = async (req: ListSearchResultsRequest) => {
  const response = await axiosInstance.get<ListSearchResultsResponse>(`search?keyword=${req.keyword}&date=${req.date}`);
  return response.data.value;
};

type ListKeywordResponse = {
  value: Keyword[];
};

const listKeywords = async () => {
  const response = await axiosInstance.get<ListKeywordResponse>('search/keyword');

  return response.data;
};

type AroundSearchRequest = {
  categoryIds: string[];
  date: string;
  startTime: string;
  endTime: string;
  latitude: number;
  longitude: number;
};

type AroundSearchResponse = {
  value: Place[];
};

const aroundSearch = async (params: AroundSearchRequest) => {
  const response = await axiosInstance.get<AroundSearchResponse>('search/around', { params });

  return response.data;
};

export const SearchService = {
  listSearchResults,
  listKeywords,
  aroundSearch,
};
