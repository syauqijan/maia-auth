import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export default NextAuth({
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async sendVerificationRequest({ identifier: email, url, provider }) {
      const { host } = new URL(url);
      const transporter = nodemailer.createTransport(provider.server);


      const emailTemplatePath = path.resolve('path/to/email-template.html');
      let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');


      emailTemplate = emailTemplate.replace('{{NAME}}', email);
      emailTemplate = emailTemplate.replace('{{VERIFICATION_LINK}}', url);

      const result = await transporter.sendMail({
        to: email,
        from: provider.from,
        subject: 'Verify Your Email Address to Complete Registration',
        html: emailTemplate,
      });

      if (result.rejected.length > 0) {
        throw new Error(`Email(s) not sent: ${result.rejected.join(', ')}`);
      }
    },
  },
});
