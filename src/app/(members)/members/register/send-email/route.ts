// app/api/sendEmail/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

export async function POST(request: NextRequest) {
  try {
    const body: { recipientEmail: string; recipientName: string; name: string } =
      await request.json();
    const { recipientEmail } = body;

    if (!recipientEmail) {
      return NextResponse.json({ error: 'recipientEmail is required' }, { status: 400 });
    }

    const response = await resend.emails.send({
      from: 'info@mail.a.com',
      to: recipientEmail,
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
    });

    if (response.error) {
      return NextResponse.json(response.error, { status: 404 });
    }

    return NextResponse.json({ message: 'Email sent' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
