import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { AppointmentStatus } from '../../common/enums';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
    status: AppointmentStatus;
}
