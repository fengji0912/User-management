"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mysql2_1 = __importDefault(require("mysql2"));
const body_parser_1 = __importDefault(require("body-parser"));
const web = (0, express_1.default)();
web.use((0, cors_1.default)(), body_parser_1.default.json());
const conn = mysql2_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'mydb',
    port: 3306
});
conn.connect();
web.listen(8000, () => {
    console.log(`server is running at port 8000`);
});
web.get('/users', (_, res) => {
    const sql = 'select * from users';
    conn.query(sql, (error, results) => {
        if (error)
            return res.json({
                code: 404,
                message: error
            });
        res.json({
            code: 200,
            message: results,
        });
    });
});
web.post('/addUser', (req, res) => {
    const Customer_Number = req.body.Customer_Number;
    const Username = req.body.Username;
    const First_Name = req.body.First_Name;
    const Last_Name = req.body.Last_Name;
    const Email = req.body.Email;
    const Date_of_Birth = req.body.Date_of_Birth;
    const Password = req.body.Password;
    const sql = "insert into users (Customer_Number, Username, First_Name, Last_Name, Email, Date_of_Birth, Password) \
    values('" + Customer_Number + "','" + Username + "','" + First_Name + "','" + Last_Name + "','" + Email + "','" + Date_of_Birth + "','" + Password + "')";
    conn.query(sql, req.body, (error) => {
        if (error)
            return res.json({
                code: 404,
                message: error
            });
        res.json({
            code: 200,
            message: 'the user is created',
        });
    });
});
web.put('/editUser', (req, res) => {
    const Customer_Number = req.body.Customer_Number;
    const Username = req.body.Username;
    const First_Name = req.body.First_Name;
    const Last_Name = req.body.Last_Name;
    const Email = req.body.Email;
    const Date_of_Birth = req.body.Date_of_Birth;
    const Password = req.body.Password;
    const sql = "update users set Username='" + Username + "',First_Name='" + First_Name + "'Last_Name='" + Last_Name + "'Email='" + Email + "'Date_of_Birth='" + Date_of_Birth + "'Password='" + Password + "'where Customer_Number=" + Customer_Number;
    conn.query(sql, (error) => {
        if (error)
            return res.json({
                code: 404,
                message: error
            });
        res.json({
            code: 200,
            message: 'the user is updated',
        });
    });
});
web.delete('/deleteUser/:c_n', (req, res) => {
    const { c_n } = req.params;
    const sql = 'delete from users where Customer_Number=' + c_n;
    conn.query(sql, c_n, (error) => {
        if (error)
            return res.json({
                code: 404,
                message: error
            });
        res.json({
            code: 200,
            message: 'the user is deleted',
        });
    });
});
