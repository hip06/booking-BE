import nodemailer from 'nodemailer'
require('dotenv').config()



let sendEmailVerify = async (data) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: '"Bookingcare 👻" <foo@example.com>', // sender address
        to: data.email, // list of receivers
        subject: "Xác nhận thông tin đặt lịch khám bệnh", // Subject line
        // text: "Hello world?", // plain text body
        html: `<h4>Xin chào ${data.fullName}!</h4>
        <p>Bạn nhận dược email này vì đã xác nhận đặt lịch khám bệnh của Booking Care.</p>
        <p>Vui lòng kiểm tra lại thông tin bên dưới đây và bấm vào link để xác nhận cuộc hẹn:</p>
        <ul>
          <li>Tên người đặt: <b>${data.fullName}</b></li>
          <li>Tên bác sĩ: <b>${data.doctorName}</b></li>
          <li>Thời gian khám: <b>${data.time}</b></li>
          <li>Lí do khám bệnh: <b>${data.reason}</b></li>
        </ul>
        <p>Link xác nhận: <a href=${process.env.REACT_APP}/verify-booking?doctorId=${data.doctorId}&token=${data.token}>Click here!</a></p>`, // html body
    })
}
let sendRemedy = async (data) => {
    // console.log(data);
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: '"Bookingcare 👻" <foo@example.com>',
        to: data.email,
        subject: "Lịch khám của bạn đã được chấp nhận",
        attachments: [
            {
                filename: 'Bill.jpeg',
                path: data.imgbase64 ? data.imgbase64 : ''
            }
        ],
        html: `<h4>Xin chào ${data.fullName}!</h4>
        <p>Lịch hẹn của bạn vào ngày ${data.date} vào thời điểm ${data.timeType} đã được bác sĩ chấp nhận.</p>
        <p>Vui lòng kiểm hãy đến phòng khám đúng giờ. Cảm ơn bạn đã tin tưởng chúng tôi!</p>`
    })
    // console.log('check info', info);
}


module.exports = {
    sendEmailVerify, sendRemedy
}


