import React, {Component} from 'react'
import UserService from '../../services/UserService';

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            username: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.saveOrUpdateUsername = this.saveOrUpdateUsername.bind(this);
    }

    componentDidMount() {
        if (this.state.id === '_add') {
            return
        } else {
            UserService.getUserById(this.state.id).then((res) => {
                let user = res.data.content;
                this.setState({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username
                });
            });
        }
    }

    saveOrUpdateUsername = (e) => {
        e.preventDefault();
        let user = {firstName: this.state.firstName, lastName: this.state.lastName, username: this.state.username};

        if (this.state.id === '_add') {
            UserService.createUser(user).then(res => {
                this.props.history.push('/users');
            });
        } else {
            UserService.updateUser(user, this.state.id).then(res => {
                this.props.history.push('/users');
            });
        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    changeUsernameHandler = (event) => {
        this.setState({username: event.target.value});
    }

    cancel() {
        this.props.history.push('/users');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add User</h3>
        } else {
            return <h3 className="text-center">Update User</h3>
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                               value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                               value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Username:</label>
                                        <input placeholder="Username" name="emailId" className="form-control"
                                               value={this.state.username} onChange={this.changeUsernameHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateUsername}>Save
                                    </button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                            style={{marginLeft: "10px"}}>Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateUserComponent
