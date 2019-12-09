import { Tag } from 'antd';
import theme from 'styles/theme';


const displayEmail = (email) => {
  const index = email.indexOf('deleted');
  if (index > - 1) {
    return email.substr(0, index - 1);
  }
  return email;
}

export const manageUsersColumns = (showEditUser, activateOrDeactivateUser) => {

  const columns = [
    {
      title: 'Name',
      width: 120,
      render: (obj) => {
        return (
          <div>
            {
              !obj.emailaddress__verified && (<div>
                <Tag color="gold">Pending</Tag>
                <br />
              </div>
              )
            }
            <span>
              {obj.last_name + ' ' + obj.first_name}
            </span>
            <br />
            <span>
              {displayEmail(obj.email)}
            </span>
          </div>
        )
      }
    },
    {
      title: 'Role',
      width: 70,
      dataIndex: 'is_superuser',
      render: (is_superuser) => {
        return (
          <span>
            {is_superuser && 'Admin'}
            {!is_superuser && 'User'}
          </span>
        )
      }
    },
    {
      title: 'Action',
      width: 100,
      render: (obj) => {
        return (
          <div>
            <span>
              <a style={{ marginRight: '3px', color: '#000' }} onClick={() => showEditUser(obj)}>
                Edit
              </a>
              {' . '}
              <a style={{ marginRight: '3px', color: theme.colorNames.red }} onClick={() => activateOrDeactivateUser(obj)}>
                {obj.is_active && 'Deactivate'}
                {!obj.is_active && 'Activate'}
              </a>
            </span>
          </div>
        )
      }
    },
  ];

  return columns;
}