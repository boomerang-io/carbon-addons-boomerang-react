import React from "react";
import { DataTable } from "@carbon/react";
import { initialRows, headers } from "./propsData";

//eslint-disable-next-line
export default (props: any) => <DataTable
  rows={initialRows}
  headers={headers}
  {...props}
  render={({
    rows,
    headers,
    getHeaderProps,
    getRowProps,
    getTableProps
  }: any) => (
    <DataTable.TableContainer title="DataTable" description="With default options">
      <DataTable.Table {...getTableProps()}>
        <DataTable.TableHead>
          <DataTable.TableRow>
            {headers.map((header: any) => //eslint-disable-next-line
            <DataTable.TableHeader {...getHeaderProps({ header })}>{header.header}</DataTable.TableHeader>)}
          </DataTable.TableRow>
        </DataTable.TableHead>
        <DataTable.TableBody>
          {rows.map((row: any) => //eslint-disable-next-line
          <DataTable.TableRow {...getRowProps({ row })}>
            {row.cells.map((cell: any) => <DataTable.TableCell key={cell.id}>{cell.value}</DataTable.TableCell>)}
          </DataTable.TableRow>)}
        </DataTable.TableBody>
      </DataTable.Table>
    </DataTable.TableContainer>
  )}
/>;
