import * as React from 'react'
import './App.css'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {Close, PlaylistAddCheckCircleRounded} from '@mui/icons-material'
import { Checkbox, createStyles, makeStyles, TableHead, Theme, useTheme } from '@mui/material';
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';


export interface DataItems{
  id:number,
  name:string,
  quantity:number,
  wrapped:boolean,
  price:number,
  currency?:string
}
function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface Props{
  dataitems:DataItems[],
  onUpdateItems: (updatedItems: DataItems[]) => void,
  columNames?:string[],
}




function splitArrayProp(arr: Array<any>):string[]{
    const firstElement = arr[0]; // Get the first element of the array
    const propertyNames = Object.keys(firstElement);
    return propertyNames;

} 

function Listpage({dataitems, onUpdateItems,columNames}:Props){
    const elementNames = columNames ?? splitArrayProp(dataitems);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    console.log(dataitems);

    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleWrapChange = (event: React.ChangeEvent<HTMLInputElement>, index:number)=>{
        const updatedBasketItems = [...dataitems];
        updatedBasketItems[index].wrapped = event.target.checked;
      onUpdateItems(dataitems); // Pass the updated state of basketitems
    };

    const handleQuantityChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      const newQuantity = parseInt(event.target.value);
      if (!isNaN(newQuantity) && newQuantity >= 0) {
          const updatedBasketItems = [...dataitems];
          updatedBasketItems[index].quantity = newQuantity;
          onUpdateItems(updatedBasketItems);
      }
    };

    const handleRemoveItem = (index: number) => {
        let updatedBasketItems = [...dataitems];
        updatedBasketItems.splice(index, 1);
        onUpdateItems(updatedBasketItems);
    };


    const items: JSX.Element[] = [];
    items.push(<TableCell>{elementNames[0].charAt(0).toUpperCase()+elementNames[0].slice(1)}</TableCell>)
    for (let i =1; i<elementNames.length; i++){
        items.push(
            <TableCell align="center" style={{width: 'fit-content'}}>{elementNames[i].charAt(0).toUpperCase()+elementNames[i].slice(1)}</TableCell>
        );
    };

  
   
  
    return(
        <TableContainer component={Paper}>
            <Table sx={{minWidth:500}} aria-label="simple table">
                <TableHead>
                    <TableRow key ={'key1'}>
                        {items}
                        <TableCell align="center">Price Total</TableCell>
                        <TableCell align='left'>Remove</TableCell>
                    </TableRow>
                </TableHead>
               <TableBody>
          {(rowsPerPage > 0 ? dataitems.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage): dataitems ).map((basketItem,index) => (
            
            <TableRow key={basketItem.id}>  
              <TableCell component="th" scope="basketItem">
                {basketItem.id}
              </TableCell>
              <TableCell align="center">{basketItem.id}</TableCell>
             
              <TableCell align="center">{basketItem.price}{basketItem.currency}</TableCell>
              <TableCell align="center"> 
              <Checkbox checked={basketItem.wrapped} onChange={(event) => handleWrapChange(event,index)}></Checkbox>
              </TableCell>
              <TableCell align="center" style={{width:"auto"}}>
                <input
                style={{width: '30%'}}
                type="number"
                value={basketItem.quantity}
                onChange={(event)=>{
                  handleQuantityChange(event,index)
                }}
                />
              </TableCell>
              <TableCell align="center" >{basketItem.quantity*basketItem.price}</TableCell>
              <TableCell align="left" >
                <IconButton onClick={()=>{
                  handleRemoveItem(index)
                }}>
                  <Close style={{color:'red'}}></Close>
                </IconButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
        <TableFooter style={{width:'fit-content'}}>
          <TableRow key = {'page'} style={{width: 'fit-content'}}>
          <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={5}
              count={dataitems.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
            </Table>
        </TableContainer>        
    )

 
}
export default Listpage
