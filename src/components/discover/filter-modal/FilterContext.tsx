import { useRouter } from 'next/router';
import { createContext, PropsWithChildren, useMemo, useState, useContext } from 'react';

export enum FilterType {
    REGION,
    PROGRAM,
    TIME
}

const FilterContext = createContext<{
    selectedFilter: FilterType | null
    setSelectedFilter: (filter: FilterType) => void
    regions: string[]
    setRegions: (region: string[]) => void
    programs: string[]
    setPrograms: (programs: string[]) => void
    setTime: (time: [number, number]) => void
    time: [number, number]
    // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ selectedFilter: null, setSelectedFilter: () => {}, regions: [], setRegions: () => {}, programs: [], setPrograms: () => {}, time: [0, 17], setTime: () => {} });

export const FilterProvider = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const { startTime, endTime, categoryIds, region } = router.query;

    const [selectedFilter, setSelectedFilter] = useState<FilterType | null>(null);

    const [regions, setRegions] = useState<string[]>(region as string[] || []);
    const [programs, setPrograms] = useState<string[]>(categoryIds as string[] || []);
    const [time, setTime] = useState<[number, number]>([startTime ? parseInt(startTime as string, 10) : 0, endTime ? parseInt(endTime as string, 10) : 17]);

    const value = useMemo(
        () => ({
            selectedFilter,
            setSelectedFilter,
            regions,
            setRegions,
            programs,
            setPrograms,
            time,
            setTime,
        }),
        [selectedFilter, setSelectedFilter, regions, programs, time],
      );

    return (<FilterContext.Provider value={value}>{children}</FilterContext.Provider>);
};

export const useFilter = () => {
    return useContext(FilterContext);
};
