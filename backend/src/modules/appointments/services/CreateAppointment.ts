import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointment';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const parsedDate = startOfHour(date);

    const isThereAppointmentInSameDate = await this.appointmentRepository.findByDate(
      parsedDate,
    );

    if (isThereAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = this.appointmentRepository.create({
      provider_id,
      date: parsedDate,
    });

    return appointment;
  }
}
