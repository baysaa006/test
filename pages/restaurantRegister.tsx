import { useQuery } from '@apollo/client';
import React from 'react';
import RegisterContent from '../components/RegisterContent/RegisterContent';
import { ME } from '../graphql/query/user.query';
import Footer from './layout/Footer';
import IndexHeader from './layout/IndexHeader';

export default function RestaurantRegister() {
  // const {
  //   loading: loadingUser,
  //   error,
  //   data: userData,
  // } = useQuery(ME, {
  //   onCompleted: (data) => {},
  // });

  return (
    <>
      {/* <IndexHeader userData={userData} loadingUser={loadingUser} /> */}
      <br />
      <RegisterContent />
      <Footer />
    </>
  );
}
