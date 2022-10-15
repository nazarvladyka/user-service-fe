import React, {Component} from 'react'
import UserService from '../../services/UserService'

class ListUsersComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(id) {
        UserService.deleteUser(id).then(res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }

    viewUser(id) {
        this.props.history.push(`/users/${id}`);
    }

    editUser(id) {
        this.props.history.push(`/add-user/${id}`);
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            this.setState({users: res.data.content});
        });
    }

    addUser() {
        this.props.history.push('/add-user/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Users List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addUser}>Add User</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(
                                user =>
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>
                                            <button onClick={() => this.editUser(user.id)}
                                                    className="btn btn-info">Update
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.deleteUser(user.id)}
                                                    className="btn btn-danger">Delete
                                            </button>
                                            <button style={{marginLeft: "10px"}} onClick={() => this.viewUser(user.id)}
                                                    className="btn btn-info">View
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default ListUsersComponent
