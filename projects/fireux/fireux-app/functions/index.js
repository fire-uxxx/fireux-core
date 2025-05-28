const { onCall } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const { logger } = require('firebase-functions');
const { initializeApp } = require('firebase-admin/app');

initializeApp();

const functions = require('firebase-functions');
const { default: app } = require('../.output/server/index.mjs');

exports.server = functions.https.onRequest((req, res) => {
  app.handle(req, res);
});

exports.setAppIdClaim = onCall({ cors: true }, async (request) => {
  const { uid, app_id } = request.data;

  logger.info('🔐 Incoming setAppIdClaim request', { uid, app_id });

  if (!uid || !app_id) {
    logger.warn('⚠️ Missing uid or app_id in request data.');
    throw new Error('Missing uid or app_id in request data.');
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { app_id });
    logger.info(`✅ Custom claim set for user ${uid} with app_id: ${app_id}`);
    return { success: true, message: 'Custom claim set successfully.' };
  } catch (error) {
    logger.error('❌ Error setting custom claim:', error);
    throw new Error('Failed to set custom claim.');
  }
});
