import { Resend } from "resend";
import { ENV } from "./env.js";

export const resend = new Resend(ENV.RESEND_API_KEY);

export const welcomeEmail = async ({ to, name }) => {
  return resend.emails.send({
    from: "Talent IQ <onboarding@resend.dev>",
    to,
    subject: "Welcome to Talent IQ",
    html: `<h2>Welcome ${name}</h2>
           <p>We’re excited to have you on <strong>Talent IQ</strong>.</p>
           <p>Start preparing for interviews and level up 🚀</p>
           <br />
           <p>— Talent IQ Team</p>`,
  });
};
