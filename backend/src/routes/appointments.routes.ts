import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/Appointment';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (_, response) => {
  const appointments = appointmentRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const isThereAppointmentInSameDate = appointmentRepository.findByDate(
    parsedDate,
  );

  if (isThereAppointmentInSameDate)
    return response.status(400).json({
      message: 'There is an appointment with the same date',
    });

  const appointment = appointmentRepository.create({
    provider,
    date: parsedDate,
  });

  return response.status(201).json(appointment);
});

export default appointmentsRouter;
