import moment from 'moment';


export const creditsUsageColumns = (userProfile) => {

  const columns = [
    {
      title: 'Date',
      width: 80,
      dataIndex: 'created_on',
      render: (date) => moment(date).format('ll'),
    },
    {
      title: 'Performed by',
      width: 100,
      render: (obj) => {
        // Display Leadbook as username if leadbook admin performed
        // a transaction for a client. Else display first name
        return (
          <span>
            {(obj.email.includes('@leadbook.com') && !userProfile.email.includes('@leadbook.com')) ? 'Leadbook' : obj.first_name}
          </span>
        )
      }
    },
    {
      title: 'Transaction',
      width: 120,
      dataIndex: 'description',
    },
    {
      title: 'Usage',
      width: 50,
      dataIndex: 'credit_amount',
    },
  ];

  return columns;
}
