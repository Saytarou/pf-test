import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FormControlLabel } from '@material-ui/core';
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { getSingleUser, updateUser } from '../redux/actions';
import { Checkbox } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));

const EditUser = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  let { id } = useParams();
  const { user } = useSelector(state => state.data);
  const [state, setState] = useState({
    name: "",
    role: "",
    phone: "",
    birthday: "",
    isArchive: user.isArchive
  });
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { name, role, phone, birthday } = state;

  useEffect(() => {
    dispatch(getSingleUser(id))
  }, []);

  useEffect(() => {
    setState({...user});
  }, [user]);

  const handleInputChange = (e) => {
    let {name, value} = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !role || !phone || !birthday) {
        setError("Пожалуйста, заполните все поля");
    } else {
        dispatch(updateUser(state, id));
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
        <h2>Изменить</h2>
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
            mask="+7 (999) 999-9999"
            onChange={handleInputChange}/>
            <br/>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue={birthday}
              onChange={handleInputChange}
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
                Изменить
            </Button>
        </form>
    </div>
  )
}

export default EditUser;