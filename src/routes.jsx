import React from 'react';
import { ErrorPage, LoginUser, MealPrepIntake, NoMatch, RegisterUser, UserPantry } from './pages';
import Root from './Root';

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MealPrepIntake />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/login',
        element: <LoginUser />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/register',
        element: <RegisterUser />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/pantry/:userId',
        element: <UserPantry />,
        errorElement: <ErrorPage />,
      },
      {
        path: '*',
        element: <NoMatch />,
      },
    ],
  },
];

export default routes;
