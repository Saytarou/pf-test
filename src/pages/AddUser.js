import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { addUser } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));

const AddUser = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    name: "",
    role: "",
    phone: "",
    birthday: ""
  });
  const [error, setError] = useState("");

  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { name, role, phone, birthday } = state;

  const handleInputChange = (e) => {
    let {name, value} = e.target;
    setState({ ...state, [name]: value.replaceAll("-", ".") });
  };

  const handleDateChange = (e) => {
    const value = e.target.value.split('-').reverse('').join('.');
    setState({ ...state, birthday: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !role || !phone || !birthday) {
        setError("Пожалуйста, заполните все поля");
    } else {
        dispatch(addUser(state));
        navigate("/");
        setError("");
    }
  };

  const handleArchive = (e) => {
    setState({...state, isArchive: e.target.checked})
  };
  
  return (
    <div>
        <Button 
            style={{ width: "150px", height: "50px", marginTop: "20px"}} 
            variant="contained" 
            color="secondary" 
            type="submit"
            onClick={() => navigate("/")}
        >
               Назад
        </Button>
        <h2>Добавить сотрудника</h2>
        {error && <h3 style={{ color: "red" }}>{error}</h3>}
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField 
            id="standard-basic" 
            label="Имя" 
            value={name} 
            name="name"
            type="text"
            onChange={handleInputChange}
            />
            <br/>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Должность</InputLabel>
                <Select
                align="left"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                name="role"
                onChange={handleInputChange}
                >
                    <MenuItem value={'waiter'}>waiter</MenuItem>
                    <MenuItem value={'cook'}>cook</MenuItem>
                    <MenuItem value={'driver'}>driver</MenuItem>
                </Select>
            </FormControl>
            <br/>
            <TextField 
            id="standard-basic" 
            label="№ телефона" 
            value={phone}
            name="phone"
            type="text"
            onChange={handleInputChange}/>
            <br/>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue={birthday}
              onChange={handleDateChange}
              name="birthday"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br/>
            <FormControlLabel
                  control={<Checkbox onChange={handleArchive} name="isArchive" defaultChecked={state.isArchive}/>}
                  label="В архиве"
                />
            <br/>
            <Button 
                style={{ width: "150px", height: "50px", marginTop: "30px"}} 
                variant="contained" 
                color="primary" 
                type="submit"
                onChange={handleInputChange}
            >
                Добавить сотрудника
            </Button>
        </form>
    </div>
  )
}

export default AddUser;