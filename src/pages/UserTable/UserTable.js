import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Container } from 'react-bootstrap';

const columns = [
  { id: 'name', label: 'نام و نام خانوادگی', minWidth: 100 },
  { id: 'gender', label: 'جنسیت', minWidth: 100 },
  { id: 'Marriage', label: 'تاهل', minWidth: 100 },
  { id: 'CMS', label: 'نطام وظیفه', minWidth: 100 },
  { id: 'dateBirth', label: 'تاریخ تولد', minWidth: 100 },
  { id: 'skills', label: 'مهارت ها', minWidth: 130 },
 
];



export default function UserTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  function createData(name, gender, Marriage, CMS , dateBirth , skills) {
    return { name, gender, Marriage, CMS, dateBirth , skills };
  }
  
  
  const exportData = () => {
      let data = [] ; 
      JSON.parse(localStorage.getItem("userList")).map(item => (
          data.push(createData(item.firstName + " " + item.lastName , item.gender , item.Marriage ,  item.CMS, item.birthYear +"/" + item.birthMonth + "/" + item.birthDay ,  item.skills.toString()))
      ))  
      return data ; 
  }
  
  let rows = exportData()

  useEffect(() => {
     rows =  exportData()
  }, [])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
      <div className="w-screen h-screen flex justify-center items-center py-5 overflow-x-hidden">
        <Container className="md:w-8/12">
            <Paper dir="rtl" className="table-fa  ">
            <TableContainer className="">
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
        </Container>
    </div>
  );
}