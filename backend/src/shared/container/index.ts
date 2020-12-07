import { container } from 'tsyringe';

import '@modules/users/providers';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointment';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/Appointment';

import IUserRepository from '@modules/users/repositories/IUser';
import UserRepository from '@modules/users/infra/typeorm/repositories/User';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
