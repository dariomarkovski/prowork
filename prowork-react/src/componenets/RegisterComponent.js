import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderComponent } from './HeaderComponent';
import { register } from '../services/access.service';

class RegisterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: ''
        };
    }

    componentDidMount() {
        document.body.classList = ['gold-background-color'];
    }

    componentWillUnmount() {
        document.body.classList = [];
    }

    handleChange = (event) => {
        let key = event.target.id;
        let value = event.target.value;
        this.setState({
            [key]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        let { username, password, confirmPassword, email } = this.state;
        console.log(this.state);
        if (password === confirmPassword) {
            register(username, password, email)
                .then((response) => {
                    this.props.history.push('/login');
                })
                .catch((error) => {

                })
        } else {
            // TODO Implement not matching passwords 
        }
    }

    render() {
        return (
            <div>
                <HeaderComponent />
                <div className="row justify-content-center">
                    <div className="col-sm-6">
                        <div>Create your account</div>
                        <form>
                            <div className="form-group">
                                <input id="username" className="form-control" required={true} placeholder="Username" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" id="password" className="form-control" required placeholder="Password" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" id="confirmPassword" className="form-control" required placeholder="Confirm Password" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input id="email" className="form-control" required placeholder="Email" onChange={this.handleChange} />
                            </div>
                            <div className="row justify-content-center">
                                <button className="btn mr-3 btn-primary" onClick={this.onSubmit}>Register</button>
                                <Link className="btn ml-3 btn-primary" to='/login'>Go Back</Link>
                            </div>
                            {/* <div className="login-message error-msg">Passwords don't match</div> */}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterComponent;