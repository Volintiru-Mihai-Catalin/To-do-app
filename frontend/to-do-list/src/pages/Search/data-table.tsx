import {useEffect, useState} from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {Task} from "@/pages/Search/columns.tsx";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    taskEditor: (task: Task) => void;
    getTaskById: (id: number) => Task | null;
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             taskEditor,
                                             getTaskById,
                                         }: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    useEffect(() => {
        const buttons = document.querySelectorAll('.dynamic-button');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                if (id) {
                    const taskToEdit = getTaskById(parseInt(id));
                    if (taskToEdit)
                        taskEditor(taskToEdit);
                }
            });
        });

        return () => {
            buttons.forEach(button => {
                button.removeEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    if (id) {
                        const taskToEdit = getTaskById(parseInt(id));
                        if (taskToEdit)
                            taskEditor(taskToEdit);
                    }
                });
            });
        };
    }, [getTaskById, taskEditor]);

    const tokenizer = (description: string | undefined) => {

        if (!description) {
            return [""];
        }

        const refRegex = /{#(\d+)}/g;
        const sanitizedHTML = description.replace(refRegex, '<button class="dynamic-button" data-id="$1">$1</button>');

        return (
            <span
                dangerouslySetInnerHTML={{
                    __html: sanitizedHTML,
                }}
            />

        );
    }

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter tasks..."
                    value={(table.getColumn("date")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("date")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {cell.id.toString().substring(2).includes("description")?
                                                (
                                                    tokenizer(cell.getValue()?.toString())
                                                ) :
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
