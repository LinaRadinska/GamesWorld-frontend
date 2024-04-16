import { useMemo } from "react";

type usePaginationProps = {
    numberOfResults: number,
    pageSize: number,
    siblingCount: number,
    currentPage: number,
}

const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({ numberOfResults, pageSize, siblingCount, currentPage }: usePaginationProps) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(numberOfResults / pageSize);

        const totalPageNumbers = siblingCount + 5;

        /*
          Case 1
        */
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        );

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        /*
            Case 2
        */
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 2 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, "DOTS", totalPageCount];
        }

        /*
            Case 3
        */
        if (shouldShowLeftDots && !shouldShowRightDots) {

            let rightItemCount = 2 + 2 * siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
              );
            return [firstPageIndex, "DOTS", ...rightRange];
        }

        /*
            Case 4
        */
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
        }
    }, [numberOfResults, pageSize, siblingCount, currentPage]);

    return { paginationRange };
};

export default usePagination;