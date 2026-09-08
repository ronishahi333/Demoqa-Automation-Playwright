import { generate, createGuardrails } from 'otplib';

const guardrails = createGuardrails({ MIN_SECRET_BYTES: 10 });

export async function generateOTP(secret: string): Promise<string> {
  return generate({ secret, guardrails });
}