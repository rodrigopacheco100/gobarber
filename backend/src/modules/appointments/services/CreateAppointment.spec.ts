import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointment';
import CreateAppointmentService from './CreateAppointment';

describe('CreateAppointment', () => {
  it('should be able to create an appointment', async () => {
    const appointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      appointmentRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
    expect(appointment).toHaveProperty('date');
  });

  it('should not be able to create two appointments in the same time', async () => {
    const appointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      appointmentRepository,
    );

    const date = new Date(2020, 5, 1, 11);

    await createAppointment.execute({
      date,
      provider_id: '123456',
    });

    expect(
      createAppointment.execute({
        date,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
