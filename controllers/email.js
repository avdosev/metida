const nodemail = require("nodemailer")

let testAccount = await nodemailer.createTestAccount(); //хм


transporter = nodemail.createTransport({
    host: 'smtp.yandex.ru', //host: 'smtp.gmail.com', работает для гугла
    port: 7080,
    secure: false,
    auth: {
        user: testAccount.user, 
        pass: testAccount.pass
    }
})


info = ({
    from: testAccount.user,
    to: "puk",
    subject: "Confirmation on metida.tech",
    html: "<h1> Confirm </h1> <a href=\"metida.tech\" " 

});

sender = transporter.sendMail(info, (error, logs) => {
    if (error) {
        console.log(error)
    }
    console.log(logs.messageId)

})

console.log(info.messageId)


module.exports = {
    transporter,
    info,
    sender
};
