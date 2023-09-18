import React from 'react';
import { ErrorPage, LoginUser, MealPrepIntake, NoMatch, RegisterUser, UserPantry } from './pages';
import Root from './Root';
import {
  EditInventory,
  EditMealPlans,
  PantryIntro,
  ViewInventory,
  ViewMealPlans,
} from './organisms';

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
        children: [
          {
            path: '/pantry/:userId/home',
            element: <PantryIntro />,
          },
          {
            path: '/pantry/:userId/inventory/edit',
            element: <EditInventory />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/pantry/:userId/inventory/view',
            element: <ViewInventory />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/pantry/:userId/meal-plans/edit',
            element: <EditMealPlans />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/pantry/:userId/meal-plans/view',
            element: <ViewMealPlans />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NoMatch />,
      },
    ],
  },
];

export default routes;
