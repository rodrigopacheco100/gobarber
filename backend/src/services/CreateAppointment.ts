import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/Appointment';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const parsedDate = startOfHour(date);

    const isThereAppointmentInSameDate = appointmentRepository.findByDate(
      parsedDate,
    );

    if (isThereAppointmentInSameDate)
      throw Error('This appointment is already booked');

    const appointment = appointmentRepository.create({
      provider,
      date: parsedDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
