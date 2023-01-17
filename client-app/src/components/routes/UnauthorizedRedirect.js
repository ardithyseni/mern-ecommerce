import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedRedirect = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary"><Link to ='/'>Back Home</Link></Button>}
  />
);
export default UnauthorizedRedirect;