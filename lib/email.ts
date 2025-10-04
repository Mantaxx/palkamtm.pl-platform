import crypto from 'crypto'
import sgMail from '@sendgrid/mail'

// Konfiguracja SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export interface EmailData {
    to: string
    subject: string
    html: string
    text?: string
}

export function generateActivationToken(): string {
    return crypto.randomBytes(32).toString('hex')
}

export function createActivationEmail(email: string, activationToken: string): EmailData {
    const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activate?token=${activationToken}`

    return {
        to: email,
        subject: 'Aktywacja konta - Gołębie Pocztowe',
        html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Aktywacja konta</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Witamy w Gołębie Pocztowe!</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Aktywacja konta</h2>
            
            <p>Dziękujemy za rejestrację w naszej platformie aukcyjnej gołębi pocztowych.</p>
            
            <p>Aby aktywować swoje konto i rozpocząć korzystanie z platformy, kliknij w poniższy przycisk:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${activationUrl}" 
                 style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Aktywuj konto
              </a>
            </div>
            
            <p>Jeśli przycisk nie działa, skopiuj i wklej poniższy link do przeglądarki:</p>
            <p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 5px; font-family: monospace;">
              ${activationUrl}
            </p>
            
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
            
            <p style="font-size: 14px; color: #6c757d;">
              Ten link jest ważny przez 24 godziny. Jeśli nie aktywujesz konta w tym czasie, 
              będziesz musiał zarejestrować się ponownie.
            </p>
            
            <p style="font-size: 14px; color: #6c757d;">
              Jeśli nie rejestrowałeś się na naszej platformie, zignoruj ten email.
            </p>
          </div>
        </body>
      </html>
    `,
        text: `
      Witamy w Gołębie Pocztowe!
      
      Dziękujemy za rejestrację w naszej platformie aukcyjnej gołębi pocztowych.
      
      Aby aktywować swoje konto, kliknij w poniższy link:
      ${activationUrl}
      
      Ten link jest ważny przez 24 godziny.
      
      Jeśli nie rejestrowałeś się na naszej platformie, zignoruj ten email.
    `
    }
}

export async function sendEmail(emailData: EmailData): Promise<boolean> {
    try {
        if (!process.env.SENDGRID_API_KEY) {
            console.log('📧 SendGrid API Key nie jest ustawiony - symulacja wysyłania emaila:', {
                to: emailData.to,
                subject: emailData.subject,
            })
            return true
        }

        const msg = {
            to: emailData.to,
            from: process.env.SENDGRID_FROM_EMAIL || 'noreply@palkamtm.pl',
            subject: emailData.subject,
            text: emailData.text,
            html: emailData.html,
        }

        await sgMail.send(msg)
        console.log('📧 Email wysłany przez SendGrid:', {
            to: emailData.to,
            subject: emailData.subject,
        })

        return true
    } catch (error) {
        console.error('Błąd wysyłania emaila przez SendGrid:', error)
        return false
    }
}
