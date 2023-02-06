import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.date || !data.timeType) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: 'Bệnh nhân A',
                    time: '8:00 - 9:00 Thứ hai 6/2/2022',
                    doctorName: 'Châu Đại Tiểu',
                    redirectLink: 'https://www.youtube.com/watch?v=gD8y_VvgnLE',
                });

                // upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                    },
                });

                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                        },
                    });
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succeed',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    postBookAppointment,
};
