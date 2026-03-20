import { Email } from '../types';

const emailTemplates = [
  {
    fromName: 'Netflix',
    from: 'info@netflix.com',
    subject: 'Verify your email address',
    body: `<div style="font-family: sans-serif;">
      <h2 style="color: #e50914;">Welcome to Netflix!</h2>
      <p>Thanks for signing up. Please verify your email address by clicking the button below.</p>
      <p style="margin: 24px 0;"><a href="#" style="background: #e50914; color: white; padding: 12px 32px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a></p>
      <p style="color: #666; font-size: 14px;">If you didn't create an account, you can safely ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      <p style="color: #999; font-size: 12px;">Netflix, Inc. · Los Gatos, CA</p>
    </div>`,
    avatar: '🎬',
  },
  {
    fromName: 'GitHub',
    from: 'noreply@github.com',
    subject: '[GitHub] Please verify your email address',
    body: `<div style="font-family: sans-serif;">
      <h2>Hey there! 👋</h2>
      <p>You recently registered a new email address on GitHub. To complete the verification process, please click the link below:</p>
      <p style="margin: 24px 0;"><a href="#" style="background: #2ea44f; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: bold;">Verify email address</a></p>
      <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
      <p style="color: #666; font-size: 14px;">Tip: You can also verify by pasting this code: <strong>847291</strong></p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      <p style="color: #999; font-size: 12px;">GitHub, Inc. · 88 Colin P Kelly Jr St · San Francisco, CA 94107</p>
    </div>`,
    avatar: '🐙',
  },
  {
    fromName: 'Spotify',
    from: 'no-reply@spotify.com',
    subject: 'Confirm your email for Spotify',
    body: `<div style="font-family: sans-serif;">
      <h2 style="color: #1db954;">Confirm your email 🎵</h2>
      <p>You're almost there! Confirm your email so we can start recommending music you'll love.</p>
      <p style="margin: 24px 0;"><a href="#" style="background: #1db954; color: white; padding: 14px 36px; text-decoration: none; border-radius: 500px; font-weight: bold;">Confirm Email</a></p>
      <p style="color: #666; font-size: 14px;">Or enter this confirmation code: <strong>SPOT-4829</strong></p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      <p style="color: #999; font-size: 12px;">Spotify AB · Regeringsgatan 19 · Stockholm, Sweden</p>
    </div>`,
    avatar: '🎵',
  },
  {
    fromName: 'Amazon',
    from: 'account-update@amazon.com',
    subject: 'Your Amazon verification code',
    body: `<div style="font-family: sans-serif;">
      <h2 style="color: #ff9900;">Amazon Security</h2>
      <p>Your one-time verification code is:</p>
      <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #232f3e; margin: 24px 0; text-align: center;">839 472</p>
      <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes. Do not share this code with anyone.</p>
      <p style="color: #666; font-size: 14px;">If you didn't request this code, please change your password immediately.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      <p style="color: #999; font-size: 12px;">Amazon.com, Inc. · Seattle, WA</p>
    </div>`,
    avatar: '📦',
  },
  {
    fromName: 'Discord',
    from: 'noreply@discord.com',
    subject: 'Verify your Discord email address',
    body: `<div style="font-family: sans-serif;">
      <h2 style="color: #5865f2;">Hey there!</h2>
      <p>Welcome to Discord! Before we get started, we need to verify your email address.</p>
      <p style="margin: 24px 0;"><a href="#" style="background: #5865f2; color: white; padding: 12px 32px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a></p>
      <p style="color: #666; font-size: 14px;">Link expires in 24 hours.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      <p style="color: #999; font-size: 12px;">Sent by Discord · 444 De Haro Street · San Francisco, CA 94107</p>
    </div>`,
    avatar: '💬',
  },
  {
    fromName: 'Twitter / X',
    from: 'verify@x.com',
    subject: 'Confirm your X account',
    body: `<div style="font-family: sans-serif;">
      <h2>Confirm your identity on X</h2>
      <p>Your confirmation code is below — enter it in the browser window where you've started signing up for X.</p>
      <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #0f1419; margin: 24px 0; text-align: center;">294 018</p>
      <p style="color: #666; font-size: 14px;">Verification codes expire after 15 minutes.</p>
      <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this message.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      <p style="color: #999; font-size: 12px;">X Corp. · 1355 Market Street, Suite 900 · San Francisco, CA 94103</p>
    </div>`,
    avatar: '🐦',
  },
  {
    fromName: 'LinkedIn',
    from: 'security@linkedin.com',
    subject: 'Here\'s your LinkedIn PIN',
    body: `<div style="font-family: sans-serif;">
      <h2 style="color: #0a66c2;">LinkedIn Security</h2>
      <p>Hi there,</p>
      <p>Use this PIN to verify your email address. The PIN expires in 15 minutes.</p>
      <p style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #0a66c2; margin: 24px 0; text-align: center;">582 937</p>
      <p style="color: #666; font-size: 14px;">If you didn't make this request, let us know immediately.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      <p style="color: #999; font-size: 12px;">LinkedIn Corporation · 1000 W Maude Ave · Sunnyvale, CA 94085</p>
    </div>`,
    avatar: '💼',
  },
  {
    fromName: 'Twitch',
    from: 'no-reply@twitch.tv',
    subject: 'Twitch - Email Verification',
    body: `<div style="font-family: sans-serif;">
      <h2 style="color: #9146ff;">Welcome to Twitch! 🎮</h2>
      <p>Thanks for joining! Please verify your email to unlock all features.</p>
      <p>Your verification code:</p>
      <p style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #9146ff; margin: 24px 0; text-align: center;">TW-739284</p>
      <p style="color: #666; font-size: 14px;">Start watching your favorite streamers today!</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      <p style="color: #999; font-size: 12px;">Twitch Interactive, Inc. · 350 Bush Street · San Francisco, CA 94104</p>
    </div>`,
    avatar: '🎮',
  },
];

let emailCounter = 0;

export function generateMockEmail(): Email {
  const template = emailTemplates[emailCounter % emailTemplates.length];
  emailCounter++;
  
  return {
    id: `email-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    from: template.from,
    fromName: template.fromName,
    subject: template.subject,
    body: template.body,
    timestamp: new Date(),
    read: false,
    avatar: template.avatar,
  };
}

export function getRandomDelay(): number {
  return Math.floor(Math.random() * 15000) + 8000; // 8-23 seconds
}
