import React, {memo, ReactNode, SyntheticEvent, useCallback, useMemo, useState} from "react";
import {Pagination, PaginationProps, SemanticWIDTHS, Table} from "semantic-ui-react";
import './index.scss';

export type HeaderType = {
    title: string | ReactNode;
    value: string;
    width: SemanticWIDTHS;
    sortable?: boolean;
    alignment?: 'left' | 'center' | 'right';
    key: string;
};

export type CellItemType = { raw: string | number, display: string | number | ReactNode };
export type BodyDataType = {
    [value: string]: string | number | CellItemType;
}

const getRawValue = (value: CellItemType | string | number) => (typeof value === 'object' ? value.raw.toString() : value.toString());
const getDisplayValue = (value: CellItemType | string | number) => {
    const newValue = (typeof value === 'object' ? value.display : value);
    return newValue != null ? newValue : '-';
};

type TableComponentPros = {
    headers: HeaderType[];
    data: BodyDataType[];
    maxItem?: number;
    sortable?: boolean;
    stripped?: boolean;
    celled?: boolean;
    maxHeight?: number;
}

export const TableComponent = memo(function Component(props: TableComponentPros) {
    const [pageIndex, setPageIndex] = useState(1);
    const [sortDirection, setSortDirection] = useState<"ascending" | "descending">("ascending");
    const [sortColumn, setSortColumn] = useState<string>(props.headers[0].value);

    const onPaginationClicked = useCallback((e: SyntheticEvent, data: PaginationProps) => {
        if (typeof data.activePage === "number") {
            return setPageIndex(data.activePage);
        }
    }, []);

    const onSort = useCallback((value: string, sortable?: boolean) => {
        if (sortable !== true || props.sortable !== true) {
            return;
        }
        if (sortColumn === value) {
            return setSortDirection(sortDirection === "ascending" ? "descending" : "ascending");
        }
        setSortDirection("ascending");
        setSortColumn(value);
        return;
    }, [props.sortable, sortColumn, sortDirection]);

    const sorted = useMemo(() => {
        const diff = sortDirection === 'ascending' ? 1 : -1;
        return [...props.data].sort(((a, b) => (
            getRawValue(a[sortColumn])
                .localeCompare(getRawValue(b[sortColumn]), 'tr', {numeric: true}) >= 0 ? diff : -diff))
        );
    }, [props.data, sortColumn, sortDirection]);

    const size = useMemo(() => props.maxItem || false, [props.maxItem]);

    return (
        <div className={props.maxHeight != null ? "table-wrapper-with-scroll " : undefined}
             style={{maxHeight: props.maxHeight || undefined}}>
            <Table celled={props.celled} sortable={props.sortable}>
                <Table.Header>
                    <Table.Row>
                        {props.headers.map(
                            ({
                                 title,
                                 value,
                                 width,
                                 sortable,
                                 alignment,
                                 key,
                             }) =>
                                <Table.HeaderCell
                                    textAlign={alignment || 'left'}
                                    width={width}
                                    sorted={(sortColumn === value && sortable ? sortDirection : undefined)}
                                    onClick={() => onSort(value, sortable)}
                                    key={key}
                                >
                                    {title}
                                </Table.HeaderCell>
                        )}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sorted.slice(size ? (pageIndex - 1) * size : 0, size ? pageIndex * size : undefined)
                        .map((value, index) => (
                            <Table.Row key={`body_row_${index.toString()}`}>
                                {props.headers.map((x, i) => (
                                    <Table.Cell key={`body_cell_${i.toString()}`} textAlign={x.alignment}>
                                        {getDisplayValue(value[x.value])}
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                </Table.Body>

            </Table>
            {size ?
                <div className="pagination-container">
                    <Pagination
                        activePage={pageIndex}
                        onPageChange={onPaginationClicked}
                        totalPages={Math.ceil(props.data.length / size)}
                    />
                </div> : null
            }

        </div>
    );
})