import React, {Component} from 'react'
import UserService from '../../services/UserService'

class ViewUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            user: {}
        }
    }

    componentDidMount() {
        UserService.getUserById(this.state.id).then(res => {
            this.setState({user: res.data.content});
        })

        console.log(this.state)
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> View User Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Id:&emsp;</label>
                            <div> {this.state.user.id}</div>
                        </div>
                        <div className="row">
                            <label>First Name:&emsp;</label>
                            <div> {this.state.user.firstName}</div>
                        </div>
                        <div className="row">
                            <label>Last Name:&emsp;</label>
                            <div> {this.state.user.lastName}</div>
                        </div>
                        <div className="row">
                            <label>Username:&emsp;</label>
                            <div> {this.state.user.username}</div>
                        </div>
                        <div className="row">
                            <label>Created date:&emsp;</label>
                            <div> {this.state.user.createdOn}</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewUserComponent
