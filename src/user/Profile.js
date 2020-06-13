import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import {Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        password: '',
        error: false,
        success: false
    });

    const { token , user } = isAuthenticated();
    const { name, password, success } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name});
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, password }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else if (user.role === 1){
                    setValues({...values, success: true})
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        success: true
                    });
                });
            }
        });
    };

    const redirectUser = success => {
        //console.log(user.role)
        if(success){
            return <Redirect to="/"/>
        }
    };

    const profileUpdate = (name, password) => (
        <form className="mb-5"> 
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    return (
        <Layout className="container">
            <h2 className="mb-4">Profile update</h2>
            {profileUpdate(name, password)}
            {redirectUser(success)}
        </Layout>
    ); 
};

export default Profile;
