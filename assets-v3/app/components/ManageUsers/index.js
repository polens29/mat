/**
 *
 * ManageUsers
 *
 */
/* eslint-disable camelcase, jsx-a11y/href-no-hash, jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import {
  Drawer, Table
} from 'antd';

import { Wrapper, WrapperContent, StyledButton, WrapperAddUser, ActivatedButton, DeactivatedButton } from './css';
import { manageUsersColumns } from './constants'
import AddUser from './AddUser';
import EditUser from './EditUser';

const userObj = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  is_active: '',
  is_superuser: false,
};

const roles = [
  {
    label: 'Admin',
    value: true,
  },
  {
    label: 'User',
    value: false,
  }
];

class ManageUsers extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userObject: userObj,
      step: 0,
      onSave: false,
    };
  }

  componentWillMount() {
    this.props.getUsersInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkSendInvitationLoading(prevProps);
    this.checkupdateManageUserLoading(prevProps);
    this.checkDeactivateManageUserLoading(prevProps);
  }

  checkSendInvitationLoading(prevProps) {
    const sendInvitationLoading = this.props.sendInvitationLoading;
    const prevSendInvitationLoading = prevProps.sendInvitationLoading;
    const sendInvitationErrorLoading = this.props.sendInvitationErrorLoading;
    if (sendInvitationLoading === false && sendInvitationLoading !== prevSendInvitationLoading && sendInvitationErrorLoading == false) {
      this.props.getUsersInfo();
      this.setState(
        {
          userObject: userObj,
          step: 3,
          onSave: false,
        }
      );
    }
  };

  checkupdateManageUserLoading(prevProps) {
    const updateManageUserLoading = this.props.updateManageUserLoading;
    const prevUpdateManageUserLoading = prevProps.updateManageUserLoading;
    if (updateManageUserLoading === false && updateManageUserLoading !== prevUpdateManageUserLoading) {
      this.props.getUsersInfo();
      this.handleBack();
    }
  };


  checkDeactivateManageUserLoading(prevProps) {
    const activateOrDeactivateManageUserLoading = this.props.activateOrDeactivateManageUserLoading;
    const prevActivateOrDeactivateManageUserLoading = prevProps.activateOrDeactivateManageUserLoading;
    if (activateOrDeactivateManageUserLoading === false && activateOrDeactivateManageUserLoading !== prevActivateOrDeactivateManageUserLoading) {
      this.props.getUsersInfo();
    }
  };

  handleCancel = () => {
    this.setState(
      {
        userObject: userObj,
        step: 0,
        onSave: false,
      }
    );
  };

  showAddUser = () => {
    this.setState(
      {
        step: 1,
      }
    );
  };

  showEditUser = (user) => {
    this.setState(
      {
        userObject: {
          ...user,
        },
        step: 2,
      }
    );
  };

  handleBack = () => {
    this.setState(
      {
        userObject: userObj,
        step: 0,
        onSave: false,
      }
    );
  };

  handleChange = (key, value) => {
    return this.setState({
      userObject: { ...this.state.userObject, [key]: value },
    });
  };

  handleAddUser = () => {
    this.setState({ onSave: true });
    const { userObject } = this.state;
    const { email } = userObject;
    if (email) {
      const payload = {
        first_name: userObject.first_name,
        last_name: userObject.last_name,
        email: userObject.email,
        is_superuser: userObject.is_superuser,
      };

      this.props.addUserInvitation(payload);
    }

  };

  handleEditUser = () => {
    const { userObject } = this.state;
    const payload = {
      id: userObject.id,
      first_name: userObject.first_name,
      last_name: userObject.last_name,
      email: userObject.email,
      is_superuser: userObject.is_superuser,
    };

    this.props.updateManageUser(payload);
  };

  showActivedUsers = () => {
    this.props.getUsersInfo(true);
  };

  showDeactivedUsers = () => {
    this.props.getUsersInfo(false);
  };

  handleClose = () => {
    this.props.closeManageUsersModal();
    this.handleBack();
  };

  activateOrDeactivateUser = (user) => {
    this.props.activateOrDeactivateManageUser(user);
  };

  render() {

    const { step, userObject, onSave } = this.state;
    const { usersInfo, sendInvitationLoading, updateManageUserLoading } = this.props;
    const columns = manageUsersColumns(this.showEditUser, this.activateOrDeactivateUser);

    const width = columns.reduce((accu, col) => accu + col.width, 50);
    return (
      <Wrapper>
        <Drawer
          title="Manage users"
          visible={this.props.manageUsersModal}
          onClose={() => this.handleClose()}
          width="650"
          style={{ padding: '20px' }}
        >

          {
            step == 0 && (
              <div>
                <WrapperAddUser>
                  <StyledButton className="ant-btn ant-btn-primary" onClick={() => this.showAddUser()}>
                    Add User
                  </StyledButton>
                </WrapperAddUser>
                <WrapperContent>
                  <div style={{ marginBottom: 40, textAlign: 'center' }}>
                    <ActivatedButton className="ant-btn ant-btn-default" style={{ marginRight: 20 }} onClick={() => this.showActivedUsers()}>
                      Activated
                    </ActivatedButton>
                    <DeactivatedButton className="ant-btn ant-btn-default" onClick={() => this.showDeactivedUsers()}>
                      Deactivated
                    </DeactivatedButton>
                  </div>
                  <div style={{ marginBottom: 30 }}>
                    <Table
                      columns={columns}
                      dataSource={usersInfo}
                      pagination={false}
                      scroll={{
                        x: width,
                      }}
                      locale={{
                        emptyText: 'No users.',
                        filterConfirm: 'Ok',
                        filterReset: 'Cancel',
                        filterTitle: 'Options',
                      }}
                    />
                  </div>
                </WrapperContent>
              </div>
            )
          }

          {
            step == 1 && <AddUser
              userObject={userObject}
              handleAddUser={this.handleAddUser}
              handleBack={this.handleBack}
              handleCancel={this.handleCancel}
              handleChange={this.handleChange}
              onSave={onSave}
              roles={roles}
              sendInvitationLoading={sendInvitationLoading}
            />
          }

          {
            step == 2 && <EditUser
              userObject={userObject}
              handleEditUser={this.handleEditUser}
              handleBack={this.handleBack}
              handleCancel={this.handleCancel}
              handleChange={this.handleChange}
              onSave={onSave}
              roles={roles}
              updateManageUserLoading={updateManageUserLoading}
            />
          }

          {
            step == 3 && (
              <div
                style={{
                  textAlign: 'center',
                  width: '100%',
                  margin: '0 auto',
                  display: 'inline-block',
                  paddingTop: '50%',
                }}
              >
                <span style={{ fontSize: '20px', color: '#333333' }}>Thank you!</span>
                <br/><br/>
                <span style={{ fontSize: '18px' }}>Check your email to complete your registration</span>
              </div>
            )
          }
        </Drawer>
      </Wrapper>
    )
  }
}

ManageUsers.propTypes = {
  closeManageUsersModal: PropTypes.func,
  manageUsersModal: PropTypes.bool,
  usersInfo: PropTypes.object,
  getUsersInfo: PropTypes.func,
  addUserInvitation: PropTypes.func,
  sendInvitationLoading: PropTypes.bool,
  updateManageUser: PropTypes.func,
  updateManageUserLoading: PropTypes.bool,
  activateOrDeactivateManageUser: PropTypes.func,
  activateOrDeactivateManageUserLoading: PropTypes.bool,
  sendInvitationErrorLoading: PropTypes.bool,
};

export default ManageUsers;
