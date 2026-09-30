import assert from 'node:assert/strict';
import handler from '../api/contact.js';

const run = async (request) => {
  const state = { status: 200, body: null };
  const response = {
    status(code) { state.status = code; return this; },
    json(body) { state.body = body; return this; },
  };
  await handler({ headers: {}, ...request }, response);
  return state;
};

assert.equal((await run({ method: 'GET' })).status, 405);
assert.equal((await run({ method: 'POST', body: '{broken' })).status, 400);
assert.equal((await run({ method: 'POST', body: { company_website: 'bot.example' } })).status, 200);
assert.equal((await run({ method: 'POST', body: {} })).status, 400);
const valid = {
  name: 'Test Client', email: 'client@example.com', phone: '+237 600 000 000',
  matter: 'Other / Autre', message: 'A non-sensitive test enquiry.', locale: 'en', consent: 'on',
};
const oldKey = process.env.RESEND_API_KEY;
const oldFrom = process.env.CONTACT_FROM_EMAIL;
delete process.env.RESEND_API_KEY;
delete process.env.CONTACT_FROM_EMAIL;
assert.equal((await run({ method: 'POST', body: valid })).status, 503);
if (oldKey) process.env.RESEND_API_KEY = oldKey;
if (oldFrom) process.env.CONTACT_FROM_EMAIL = oldFrom;
console.log('Contact validation and safe-failure checks passed.');
