import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

/*export const sendEmail = async (email, subject, text) => {
    try {
    const transporter = nodemailer.createTransport({
      //host: process.env.USER,
      service: process.env.SERVICE,
      //port: Number(process.env.EMAIL_PORT),
      //secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER, yosr.ghozzi@insat.ucar.tn
      to: email,
      subject: subject,
      text: text,
    });
    console.log('email sent successfully');
  } catch (error) {
    console.log('email not sent!');
    console.log(error);
    return error;
  }
}
*/

export const sendEmail = async (
  email,
  subject,
  url, 
  studentId,
  levelOfStudy,
  clubs
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zaynebfathalli1661@gmail.com",
        pass: "yzzq flkk iaka eckh",
      },
    });

    const text = `Veuillez confirmer les informations suivantes :
- Votre numéro d'étudiant est : ${studentId}
- Votre niveau d'étude est : ${levelOfStudy}
- Les clubs que vous gérez sont : ${clubs.join(", ")}

Veuillez vérifier que toutes les informations sont correctes. Des sanctions peuvent être appliquées en cas d'informations incorrectes.

Veuillez confirmer votre adresse e-mail en cliquant sur le lien suivant : ${url}`;

    await transporter.sendMail({
      from: "ghozzi.yosr.02@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
