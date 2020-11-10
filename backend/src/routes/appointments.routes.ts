import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/Appointment';
import CreateAppointmentService from '../services/CreateAppointment';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const createAppointmentService = new CreateAppointmentService();
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.status(201).json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
