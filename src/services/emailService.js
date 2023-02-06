require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Hoang Duong 👻" <hvdvietnamquetoi@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận email này vì đã đặt lịch khám online trên BookingCare</p>
        <p>Thông tin đặt lịch khám:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu thông tin là đúng sự thật vui lòng click vào đường link bên dưới để xác nhận 
        và hoàn tất thủ tục đặt lịch khám</p>
        <div>
        <a href=${dataSend.redirectLink} target='_blank'>Click here</a>
        </div>
        <di>Xin chân thành cảm ơn</di>
        `,
    });
};

module.exports = {
    sendSimpleEmail,
};
