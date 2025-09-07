'use client';

import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function Users(){
    type User = {
      Customer_Number: string,
      Username: string,
      First_Name: string,
      Last_Name: string,
      Email: string,
      Date_of_Birth: string,
      Password: string,
      Last_Login: string
    };
    const [users, setUsers] = useState<User[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
      Customer_Number: '',
      Username: '',
      First_Name: '',
      Last_Name: '',
      Email: '',
      Date_of_Birth: '',
      Password: '',
      Repeat_Password: ''
    });
    const [prev_Form, setPrev_Form] = useState({
      Customer_Number: '',
      Username: '',
      First_Name: '',
      Last_Name: '',
      Email: '',
      Date_of_Birth: '',
      Password: '',
      Repeat_Password: ''
    });
    const [selectedColumn, setSelectedColumn] = useState('Customer_Number');
    const [ascending_descending, setAscending_descending] = useState(true);
    const [adding_Editing, setAdding_Editing] = useState(true);
    const [search_Input, setSearch_Input] = useState('');
    const [option_Value, setOption_Value] = useState('');
    const [exist, setExist] = useState(false);

    const Default_form = {
      Customer_Number: '',
      Username: '',
      First_Name: '',
      Last_Name: '',
      Email: '',
      Date_of_Birth: '',
      Password: '',
      Repeat_Password: ''
    }

    const getUsers =()=>{
      axios.get('https://jubilant-halibut-5gqx9r7p556q24vpq-8000.app.github.dev/users')
        .then(res=> {const newUsers = res.data.message.map((user:User)=>({
          ...user,
          Customer_Number: String(user.Customer_Number).padStart(5, '0'),
          Date_of_Birth: user.Date_of_Birth.split("T")[0].split("-").reverse().join("."),
        }));
        setUsers(newUsers);
      })
        .catch(error => console.error(error));
    }
    
    useEffect(() => {
      getUsers();
    },[]);
    
    const search = (option_Value:string, search_Input:string) =>{
      if(option_Value === 'All'){
        getUsers();
      }else{
        const o_v  = option_Value as keyof User;
        for(let i = 0; i<users.length; i++){
          if(users[i][o_v] === search_Input){
            setUsers([users[i]]);
            setExist(true);
            break;
          }
        }
        if(exist === false) setUsers([]);
      }
    }

    const handleAddUser = () => {
      setShowForm(true); 
      setAdding_Editing(true);
    }

    const handleEditUser = (Username: string) => {
      for(let i=0; i< users.length;i++){
        if(Username === users[i].Username){
          setPrev_Form({...users[i], Repeat_Password: users[i].Password});
          setForm({...users[i], Repeat_Password: users[i].Password});
          break;
        } 
      }
      setShowForm(true);
      setAdding_Editing(false);
    }

    const handleDeleteUser = (c_n: string) => {
      try{
        console.log(c_n, `https://jubilant-halibut-5gqx9r7p556q24vpq-8000.app.github.dev/deleteUser/${c_n}`)
        axios.delete(`https://jubilant-halibut-5gqx9r7p556q24vpq-8000.app.github.dev/deleteUser/${c_n}`)
        alert('User is deleted')
        getUsers();
      }catch(error){
        console.error(error);
        alert('error deleting the user')
      }
    }

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      setForm({...form, [event.target.name]: event.target.value});
    }

    const pattern =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const dateFormat = /^(\d{2})\.(\d{2})\.(\d{4})$/;

    const handleSubmit = () => {
      try{
        if(adding_Editing){
          let unique = true;
          let len = false;
          for (let i=0; i<users.length; i++){
            if(users[i].Customer_Number === form.Customer_Number || users[i].Username === form.Username){
              alert('Customer Number or Username exists');
              unique = false;
              break;
            }
          }
          if(form.Customer_Number.length == 5 && 3 <= form.Username.length && form.Username.length <= 30 && 
            form.First_Name.length >= 2 && form.First_Name.length<=150 && form.Last_Name.length<=150 && form.Last_Name.length>=2 &&
            form.Password.length<=150 && form.Password.length >= 8){
            len = true;
            console.log('lengths of inputs are right!')
          }
          console.log(len, unique, pattern.test(form.Email), dateFormat.test(form.Date_of_Birth));
          if (len && unique && pattern.test(form.Email) && dateFormat.test(form.Date_of_Birth)){
            if (form.Password === form.Repeat_Password){
              const convertedDate = form.Date_of_Birth.split(".").reverse().join("-");
              form.Date_of_Birth = convertedDate;
              const {Repeat_Password, ...Newform} = form;
              axios.post('https://jubilant-halibut-5gqx9r7p556q24vpq-8000.app.github.dev/addUser', Newform)
              console.log(Newform, form);
              alert('User is added')
            }else{
              alert('password doesnt match!')
            }
          }else{
            alert('Format is not right!')
          }
        }else{
          let unique = true;
          let len = false;
          if(prev_Form === form){
            alert('nothing has been updated');
          }else if(prev_Form.Username != form.Username){
            alert('Username cant be edited');
          }else {
            if(prev_Form.Customer_Number != form.Customer_Number){
              for (let i=0; i<users.length; i++){
                if(users[i].Customer_Number === form.Customer_Number){
                  alert('Customer Number exists');
                  unique = false;
                  break;
                }
              }
            }
            if(form.Customer_Number.length == 5  && 
              form.First_Name.length >= 2 && form.First_Name.length<=150 && form.Last_Name.length<=150 && form.Last_Name.length>=2 &&
              form.Password.length<=150 && form.Password.length >= 8){
              len = true;
            }
            if (len && unique && pattern.test(form.Email) && dateFormat.test(form.Date_of_Birth)){
              if (form.Password === form.Repeat_Password){
                const convertedDate = form.Date_of_Birth.split(".").reverse().join("-");
                form.Date_of_Birth = convertedDate;
                const {Repeat_Password, ...Newform} = form;
                axios.put('https://jubilant-halibut-5gqx9r7p556q24vpq-8000.app.github.dev/editUser', Newform)
                console.log('---', Newform);
                alert('User is updated')
              }else{
                alert('password doesnt match!')
              }
            }else{
              alert('Format is not right!')
            }
          }
        }
        setShowForm(false);
        setForm(Default_form);
        setAdding_Editing(true);
        getUsers();
      }catch(error){
        console.error(error);
        alert('error adding the user')
      }
    }

    const sort =(col: string)=>{
      if (selectedColumn === col){
        setAscending_descending(value => !value);
      }else{
        setSelectedColumn(col);
        setAscending_descending(true);
      }
    }

    const sortedUsers = users.sort((a,b)=> {
      const key  = selectedColumn as keyof User ;
      if(a[key] < b[key]) {
        if(ascending_descending){
          return -1;
        }else return 1;
      }else if(a[key] > b[key]){
        if(ascending_descending){
          return 1;
        }else return -1;
      }else{
        return 0;
      }
    });

    return (
      <div>
        <h1>Users</h1>
        <label>
          <select style={{border: '1px solid'}} value={option_Value} onChange={(e)=>{setOption_Value(e.target.value)}} >
            <option value="All">All</option>
            <option value="Customer_Number">Customer_Number</option>
            <option value="Username">Username</option>
            <option value="First_Name">First_Name</option>
            <option value="Last_Name">Last_Name</option>
            <option value="Email">Email</option>
          </select>
        </label>
        <div style={{display: 'flex', gap: '10px'}}>
          <input style={{border: '1px solid'}} value={search_Input} type="text" onChange={(e)=>{setSearch_Input(e.target.value)}}>
          </input>
          <button style={{border: '1px solid'}} onClick={()=>search(option_Value, search_Input)}>
            Search
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th onClick={()=>{sort('Customer_Number')}}>Customer Number</th>
              <th onClick={()=>{sort('Username')}}>Username</th>
              <th onClick={()=>{sort('First_Name')}}>First Name</th>
              <th onClick={()=>{sort('Last_Name')}}>Last Name</th>
              <th onClick={()=>{sort('Email')}}>Email</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => ( 
              <tr key={user.Customer_Number}>
                <td>{user.Customer_Number}</td>
                <td>{user.Username}</td>
                <td>{user.First_Name}</td>
                <td>{user.Last_Name}</td>
                <td>{user.Email}</td>
                <td>{user.Last_Login}</td>
                <td>
                  <button onClick={()=>handleEditUser(user.Username)}>
                    Edit User
                  </button>
                </td>
                <td>
                  <button onClick={()=>handleDeleteUser(user.Customer_Number)}>
                    Delete User
                  </button>
                </td>
              </tr>
             ))}
          </tbody>
        </table>
        <button onClick={handleAddUser}>
          Add User
        </button>
        {showForm&&(
          <form onSubmit={handleSubmit}>
            <input style={{border: '1px solid'}}  name="Customer_Number" value={form.Customer_Number} placeholder='Customer_Number: 5 digits' onChange={handleChange}/>
            <input style={{border: '1px solid'}}  name="Username" value={form.Username} placeholder='  Username: 3–30 alphanumeric characters  ' onChange={handleChange}/>
            <input style={{border: '1px solid'}}  name="First_Name" value={form.First_Name}  placeholder='First Name: 2–150 characters  ' onChange={handleChange}/>
            <input style={{border: '1px solid'}}  name="Last_Name" value={form.Last_Name}  placeholder='Last Name: 2–150 characters  ' onChange={handleChange}/>
            <input style={{border: '1px solid'}}  name="Email" value={form.Email}  placeholder='Email: max 300 characters  ' onChange={handleChange}/>
            <input style={{border: '1px solid'}}  name="Date_of_Birth" value={form.Date_of_Birth}  placeholder='Date_of_Birth: DD.MM.YYYY  )' onChange={handleChange}/>
            <input style={{border: '1px solid'}}  name="Password" value={form.Password} placeholder='Password: 8–150 characters  ' onChange={handleChange}/>
            <input style={{border: '1px solid'}}  name="Repeat_Password" value={form.Repeat_Password}  placeholder='Repeat Password' onChange={handleChange}/>
            <div style={{display: 'flex', gap: '10px'}}> 
              <button type="submit">Submit</button>
              <button type="button" onClick={()=>{
                setShowForm(false);
                setForm(Default_form);
              }}>
                cancel
              </button>
            </div>
          </form>
        )}
      </div>
    )
}