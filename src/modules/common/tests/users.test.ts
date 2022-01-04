import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import App from '@/app';
import UserRoute from '@/modules/common/routes/user.route';
import { UsersPostValidation } from '../validations/users.post.validation';
import UserService from '../services/user.service';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response findAll users', async () => {
      const usersRoute = new UserRoute();
      const users = new UserService().userModel;

      users.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          email: 'a@email.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          id: 2,
          email: 'b@email.com',
          password: await bcrypt.hash('a1s2d3f4!', 10),
        },
        {
          id: 3,
          email: 'c@email.com',
          password: await bcrypt.hash('z1x2c3v4!', 10),
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.pathNested}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne user', async () => {
      const userId = 1;

      const usersRoute = new UserRoute();
      //   const users = usersRoute.usersController.userService.users;
      const users = new UserService().userModel;
      users.findByPk = jest.fn().mockReturnValue({
        id: 1,
        email: 'a@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.pathNested}/${userId}`).expect(200);
    });
  });

  describe('[POST] /users', () => {
    it('response Create user', async () => {
      const userData: UsersPostValidation = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
        lastName: 'admin',
        phone: '0',
        userName: 'admin',
        firstName: 'ss',
        role: 'admin',
      };

      const usersRoute = new UserRoute();
      // const users = usersRoute.usersController.userService.users;
      const users = new UserService().userModel;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        id: 1,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).post(`${usersRoute.pathNested}`).send(userData).expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update user', async () => {
      const userId = 1;
      const userData: UsersPostValidation = {
        email: 'test@email.com',
        password: '1q2w3e4r!',
        lastName: 'admin',
        phone: '0',
        userName: 'admin',
        firstName: 'ss',
        role: 'admin',
      };

      const usersRoute = new UserRoute();
      //   const users = usersRoute.usersController.userService.users;
      const users = new UserService().userModel;

      users.findByPk = jest.fn().mockReturnValue({
        id: userId,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });
      users.update = jest.fn().mockReturnValue([1]);
      users.findByPk = jest.fn().mockReturnValue({
        id: userId,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).put(`${usersRoute.pathNested}/${userId}`).send(userData).expect(200);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response Delete user', async () => {
      const userId = 1;

      const usersRoute = new UserRoute();
      //  const users = usersRoute.usersController.userService.users;
      const users = new UserService().userModel;

      users.findByPk = jest.fn().mockReturnValue({
        id: userId,
        email: 'a@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).delete(`${usersRoute.pathNested}/${userId}`).expect(200);
    });
  });
});
