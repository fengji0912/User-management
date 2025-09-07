import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser';

const web = express();
web.use(cors(), bodyParser.json());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'mydb',
    port: 3306
})

conn.connect()

web.listen(8000, ()=>{
    console.log(`server is running at port 8000`);
})

web.get('/users', (_, res)=>{
    const sql= 'select * from users'
    conn.query(sql, (error, results)=> {
        if (error)return res.json({
            code: 404,
            message: error
        })
        res.json({
            code: 200,
            message: results,
        })
    })
});

web.post('/addUser', (req, res)=>{
    const Customer_Number = req.body.Customer_Number;
    const Username = req.body.Username;
    const First_Name = req.body.First_Name;
    const Last_Name = req.body.Last_Name;
    const Email = req.body.Email;
    const Date_of_Birth = req.body.Date_of_Birth;
    const Password = req.body.Password;
    const sql = "insert into users (Customer_Number, Username, First_Name, Last_Name, Email, Date_of_Birth, Password) \
    values('" + Customer_Number + "','" + Username + "','" + First_Name +"','" + Last_Name + "','" + Email + "','" + Date_of_Birth + "','" + Password + "')";
    conn.query(sql, (error)=>{
        if (error)return res.json({
            code: 404,
            message: error
        })
        res.json({
            code: 200,
            message: 'the user is created',
        })
    })
});

web.put('/editUser', (req, res)=>{
    const Customer_Number = req.body.Customer_Number;
    const Username = req.body.Username;
    const First_Name = req.body.First_Name;
    const Last_Name = req.body.Last_Name;
    const Email = req.body.Email;
    const Date_of_Birth = req.body.Date_of_Birth;
    const Password = req.body.Password;
    const sql = "update users set Customer_Number='" + Customer_Number + "',First_Name='" + First_Name + "',Last_Name='" + Last_Name + "',Email='" + Email + "',Date_of_Birth='" + Date_of_Birth + "',Password='" + Password + "' where Username='" + Username + "'";
    conn.query(sql, (error)=>{
        if (error)return res.json({
            code: 404,
            message: error
        })
        res.json({
            code: 200,
            message: 'the user is updated',
        })

    })
});

web.delete('/deleteUser/:c_n', (req, res)=>{
    const {c_n} = req.params;
    const sql= 'delete from users where Customer_Number=' + c_n;
    conn.query(sql, c_n, (error)=>{
        if (error)return res.json({
            code: 404,
            message: error
        })
        res.json({
            code: 200,
            message: 'the user is deleted',
        })

    })
});
