import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from './firebase'; // تأكد من استيراد auth بشكل صحيح

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!auth.currentUser; // تحقق مما إذا كان المستخدم مسجلاً الدخول

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/Amazon" />} // إذا لم يكن مسجلاً، اذهب إلى صفحة تسجيل الدخول
    />
  );
};

export default PrivateRoute;
