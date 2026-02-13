import { expect } from 'playwright-test-coverage';
import { Page } from '@playwright/test';
import { Role, User } from '../src/service/pizzaService';

async function basicInit(page: Page) {
    let loggedInUser: User | undefined;
    const validUsers: Record<string, User> = {
        'a@jwt.com': { 
            id: '1', 
            name: 'AdminPerson', 
            email: 'a@jwt.com', 
            password: 'admin', 
            roles: [{ role: Role.Admin }]
        },
        'f@jwt.com': { 
            id: '2', 
            name: 'FranchiseePerson', 
            email: 'f@jwt.com', 
            password: 'franchisee', 
            roles: [{ role: Role.Franchisee }]
        },
        'd@jwt.com': { 
            id: '3', 
            name: 'DinerPerson', 
            email: 'd@jwt.com', 
            password: 'a', 
            roles: [{ role: Role.Diner }] 
        }
    };
  
    // Auth endpoints
    await page.route('*/**/api/auth', async (route) => {
      const req = route.request().postDataJSON();
      if (route.request().method() === 'POST') {
        if (validUsers[req.email]) {
          await route.fulfill({ status: 400, json: { error: 'User already exists' } });
        } else {
          const newUser = {
            id: String(Object.keys(validUsers).length + 1),
            name: req.name,
            email: req.email,
            password: req.password,
            roles: [{ role: Role.Diner }],
          };
          validUsers[req.email] = newUser;
          loggedInUser = newUser;
          const registerRes = {
            user: newUser,
            token: 'abcdef',
          };
          await route.fulfill({ json: registerRes });
        }
      }
      else if (route.request().method() === 'PUT') {
        const user = validUsers[req.email];
        if (!user || user.password !== req.password) {
          await route.fulfill({ status: 401, json: { error: 'Unauthorized' } });
          return;
        }
        loggedInUser = validUsers[req.email];
        const loginRes = {
          user: loggedInUser,
          token: 'abcdef',
        };
        await route.fulfill({ json: loginRes });
      }
      else if (route.request().method() === 'DELETE') {
        loggedInUser = undefined;
        await route.fulfill({ status: 204 });
      }
    });
  
    // Return the currently logged in user
    await page.route('*/**/api/user/me', async (route) => {
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: loggedInUser });
    });
  
    // A standard menu
    await page.route('*/**/api/order/menu', async (route) => {
      const menuRes = [
        {
          id: 1,
          title: 'Veggie',
          image: 'pizza1.png',
          price: 0.0038,
          description: 'A garden of delight',
        },
        {
          id: 2,
          title: 'Pepperoni',
          image: 'pizza2.png',
          price: 0.0042,
          description: 'Spicy treat',
        },
      ];
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: menuRes });
    });
  
    // Standard franchises and stores
    await page.route(/\/api\/franchise(\?.*)?$/, async (route) => {
      const franchiseRes = {
        franchises: [
          {
            id: 2,
            name: 'LotaPizza',
            stores: [
              { id: 4, name: 'Lehi' },
              { id: 5, name: 'Springville' },
              { id: 6, name: 'American Fork' },
            ],
          },
          { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
          { id: 4, name: 'topSpot', stores: [] },
        ],
      };
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: franchiseRes });
    });
  
    // Order a pizza.
    await page.route('*/**/api/order', async (route) => {
      const orderReq = route.request().postDataJSON();
      const orderRes = {
        order: { ...orderReq, id: 23 },
        jwt: 'eyJpYXQ',
      };
      expect(route.request().method()).toBe('POST');
      await route.fulfill({ json: orderRes });
    });
  
    await page.goto('/');
  }
  