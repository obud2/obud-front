import { useRouter } from 'next/router';
import { createContext, PropsWithChildren, useMemo, useState, useContext } from 'react';

export enum FilterType {
    PROGRAM,
    TIME
}

const FilterContext = createContext<{
    selectedFilter: FilterType | null
    setSelectedFilter: (filter: FilterType) => void
    programs: string[]
    setPrograms: (programs: string[]) => void
    setTime: (time: [number, number]) => void
    time: [number, number]
    // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ selectedFilter: null, setSelectedFilter: () => {}, programs: [], setPrograms: () => {}, time: [0, 17], setTime: () => {} });

export const FilterProvider = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const { startTime, endTime, categoryIds } = router.query;

    const [selectedFilter, setSelectedFilter] = useState<FilterType | null>(null);
    const [programs, setPrograms] = useState<string[]>(categoryIds as string[] || []);

    const [time, setTime] = useState<[number, number]>([startTime ? parseInt(startTime as string, 10) : 0, endTime ? parseInt(endTime as string, 10) : 17]);

    const value = useMemo(
        () => ({
            selectedFilter,
            setSelectedFilter,
            programs,
            setPrograms,
            time,
            setTime,
        }),
        [selectedFilter, setSelectedFilter, programs, time],
      );

    return (<FilterContext.Provider value={value}>{children}</FilterContext.Provider>);
};

export const useFilter = () => {
    return useContext(FilterContext);
};
