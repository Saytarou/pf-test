import React, {useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, filterUsersByRole, filterUsersByStatus, loadUsers, sortDateAsc, sortDateDesc, sortUsersAsc, sortUsersDesc } from '../redux/actions';
import { useNavigate } from "react-router-dom";

const useButtonStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    marginTop: 0,
    minWidth: 900,
  },
});

const Home = () => {
  const classes = useStyles();
  const buttonStyles = useButtonStyle();
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.data.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleDelete = (id) => {
    if(window.confirm("Вы уверены, что хотите удалить сотрудника?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleSortDesc = () => {
    dispatch(sortUsersDesc());
  };
  
  const handleSortAsc = () => {
    dispatch(sortUsersAsc());
  };

  const handleSortDateDesc = () => {
    dispatch(sortDateDesc());
  };
  
  const handleSortDateAsc = () => {
    dispatch(sortDateAsc());
  };

  const handleFilterByRole = (e) => {
    dispatch(filterUsersByRole(e.target.value));
  };

  const handleFilterByStatus = (e) => {
    dispatch(filterUsersByStatus(e.target.checked));
  };

  return (
    <div>
      <div className={buttonStyles.root}>
        <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate("/addUser")}
        >
          Добавить сотрудника
        </Button>
      </div>

      <div>
      <ButtonGroup>
        <Button onClick={handleSortDesc}>Сортировать по имени (по убыванию)</Button>
        <Button onClick={handleSortAsc}>Сортировать по имени (по возрастанию)</Button>
        <Button onClick={handleSortDateDesc}>Сортировать по дате (по убыванию)</Button>
        <Button onClick={handleSortDateAsc}>Сортировать по дате (по возрастанию)</Button>
      </ButtonGroup>

      <br/>

      <FormControl className={classes.formControl} style={{width: "200px"}}>
                <InputLabel id="demo-simple-select-label">Фильтр по должности</InputLabel>
                <Select
                align="left"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleFilterByRole}
                >
                    <MenuItem value={'waiter'}>waiter</MenuItem>
                    <MenuItem value={'cook'}>cook</MenuItem>
                    <MenuItem value={'driver'}>driver</MenuItem>
                </Select>
      </FormControl>

      <FormControlLabel
                  control={<Checkbox onChange={handleFilterByStatus}/>}
                  label="Фильтровать по статусу"
                />
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Имя</StyledTableCell>
              <StyledTableCell align="center">Должность</StyledTableCell>
              <StyledTableCell align="center">№ телефона</StyledTableCell>
              <StyledTableCell align="center">Дата рождения</StyledTableCell>
              <StyledTableCell align="center">Статус</StyledTableCell>
              <StyledTableCell align="center">Действие</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 && users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="center">{user.role}</StyledTableCell>
                <StyledTableCell align="center">{user.phone}</StyledTableCell>
                <StyledTableCell align="center">{user.birthday}</StyledTableCell>
                <StyledTableCell align="center">
                <FormControlLabel
                  control={<Checkbox checked={user.isArchive} disabled/>}
                  label="В архиве"
                />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div className={buttonStyles.root}>
                    <ButtonGroup variant="contained" aria-label="contained primary button group">
                      <Button color="secondary" onClick={() => handleDelete(user.id)}>Удалить</Button>
                      <Button color="primary" onClick={() => navigate(`/editUser/${user.id}`)}>Редактировать</Button>
                    </ButtonGroup>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      

    </div>
  )
}

export default Home;