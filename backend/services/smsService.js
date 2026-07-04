const axios = require('axios');

const SMS_API_KEY = process.env.SMS_API_KEY;
const SMS_PROVIDER = process.env.SMS_PROVIDER || 'fast2sms';

// Fast2SMS API Configuration
const FAST2SMS_API_URL = 'https://www.fast2sms.com/dev/bulkV2';
const SMS_REQUEST_TIMEOUT = 10000; // 10 seconds
const SMS_RETRY_ATTEMPTS = 1; // Retry once on timeout

/**
 * Format phone number to 10-digit Indian format
 * Removes +91, 91 prefix, leading 0, and special characters
 * 
 * Examples:
 * +919876543210 → 9876543210
 * 919876543210 → 9876543210
 * 09876543210 → 9876543210
 * 9876543210 → 9876543210
 */
const formatPhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') {
    console.error('Invalid phone input:', phone);
    return null;
  }

  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  console.log(`[Phone Formatting] Step 1 - Remove non-digits: ${cleaned}`);

  // Remove +91 or 91 prefix if present
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
    console.log(`[Phone Formatting] Step 2 - Remove 91 prefix: ${cleaned}`);
  }

  // Remove leading 0 if present
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
    console.log(`[Phone Formatting] Step 3 - Remove leading 0: ${cleaned}`);
  }

  // Validate 10-digit format
  if (cleaned.length === 10 && /^\d{10}$/.test(cleaned)) {
    console.log(`[Phone Formatting] Final: ${cleaned} ✓`);
    return cleaned;
  }

  console.error(`[Phone Formatting] Invalid final format: ${cleaned} (length: ${cleaned.length})`);
  return null;
};

/**
 * Parse Fast2SMS API Response
 * Handles all possible response formats
 */
const parseFast2SMSResponse = (response) => {
  try {
    const data = response.data;
    console.log(`[Fast2SMS Response] Status Code: ${response.status}`);
    console.log(`[Fast2SMS Response] Body:`, JSON.stringify(data, null, 2));

    // Check for return code (1 = success)
    if (data.return === 1 || data.status === 'success') {
      return {
        success: true,
        message: data.message || 'SMS sent successfully',
        smsSent: true,
        messageId: data.request_id || data.message_id,
      };
    }

    // Handle error responses
    if (data.return === 0 || data.status === 'error') {
      const errorMessage = data.message || 'Unknown API error';
      console.error(`[Fast2SMS Error] ${errorMessage}`);

      // Map common Fast2SMS errors
      const errorMap = {
        'Invalid Authorization header': 'Invalid API Key',
        'Invalid route': 'Invalid SMS Route',
        'Insufficient balance': 'Insufficient Balance',
        'Invalid sender id': 'Invalid Sender ID',
        'Number not supported': 'Number Not Supported',
        'Message rejected': 'Message Rejected',
        'Invalid route id': 'Invalid Route',
        'invalid apikey': 'Invalid API Key',
      };

      const mappedError = Object.keys(errorMap).find(key =>
        errorMessage.toLowerCase().includes(key.toLowerCase())
      );

      return {
        success: false,
        message: mappedError ? errorMap[mappedError] : errorMessage,
        smsSent: false,
        error: errorMessage,
      };
    }

    // Unknown response format
    return {
      success: false,
      message: 'Unexpected API response format',
      smsSent: false,
      error: JSON.stringify(data),
    };
  } catch (error) {
    console.error('[Fast2SMS Response] Parse error:', error.message);
    return {
      success: false,
      message: 'Failed to parse API response',
      smsSent: false,
      error: error.message,
    };
  }
};

/**
 * Send SMS via Fast2SMS API with retry logic
 */
const sendViaFast2SMS = async (phoneNumber, message, retryCount = 0) => {
  try {
    if (!SMS_API_KEY) {
      console.error('[Fast2SMS] API Key not configured');
      return {
        success: false,
        message: 'SMS service not configured',
        smsSent: false,
        error: 'Missing API Key',
      };
    }

    console.log('\n' + '='.repeat(60));
    console.log('[Fast2SMS API Call] Starting SMS request');
    console.log('='.repeat(60));

    console.log(`[Fast2SMS] API URL: ${FAST2SMS_API_URL}`);
    console.log(`[Fast2SMS] Phone: ${phoneNumber}`);
    console.log(`[Fast2SMS] Message Length: ${message.length} characters`);
    console.log(`[Fast2SMS] Retry Attempt: ${retryCount}`);

    // Build request payload
    const requestConfig = {
      method: 'post',
      url: FAST2SMS_API_URL,
      timeout: SMS_REQUEST_TIMEOUT,
      headers: {
        'Authorization': SMS_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
      data: new URLSearchParams({
        authorization: SMS_API_KEY,
        message: message,
        numbers: phoneNumber,
      }).toString(),
    };

    console.log(`[Fast2SMS] Request Config:`, {
      url: requestConfig.url,
      method: requestConfig.method,
      timeout: requestConfig.timeout,
      headers: {
        Authorization: '[API_KEY_HIDDEN]',
        'Content-Type': requestConfig.headers['Content-Type'],
      },
      dataKeys: Object.keys(JSON.parse('{"' + requestConfig.data.replace(/&/g, '","').replace(/=/g, '":"') + '"}'))
    });

    // Make API request
    const response = await axios(requestConfig);
    console.log('[Fast2SMS] API request successful (Status: ' + response.status + ')');

    // Parse and return response
    return parseFast2SMSResponse(response);

  } catch (error) {
    console.error('\n' + '='.repeat(60));
    console.error('[Fast2SMS Error] Request failed');
    console.error('='.repeat(60));

    if (error.code === 'ECONNABORTED') {
      console.error('[Fast2SMS] Timeout after ' + SMS_REQUEST_TIMEOUT + 'ms');

      if (retryCount < SMS_RETRY_ATTEMPTS) {
        console.log(`[Fast2SMS] Retrying... (Attempt ${retryCount + 1}/${SMS_RETRY_ATTEMPTS})`);
        return sendViaFast2SMS(phoneNumber, message, retryCount + 1);
      }

      return {
        success: false,
        message: 'SMS request timed out after retries',
        smsSent: false,
        error: 'Timeout',
      };
    }

    if (error.response) {
      // API returned an error response
      console.error('[Fast2SMS] Response Status:', error.response.status);
      console.error('[Fast2SMS] Response Data:', JSON.stringify(error.response.data, null, 2));

      return parseFast2SMSResponse(error.response);
    }

    if (error.request) {
      // Request made but no response
      console.error('[Fast2SMS] No response received');
      console.error('[Fast2SMS] Error Message:', error.message);
    } else {
      // Error in request setup
      console.error('[Fast2SMS] Request Setup Error:', error.message);
    }

    return {
      success: false,
      message: error.message || 'SMS sending failed',
      smsSent: false,
      error: error.message,
    };
  }
};

/**
 * Send reservation SMS to customer
 * @param {string} phoneNumber - Customer's phone number (any format)
 * @param {object} reservation - Reservation details {customerName, reservationDate, reservationTime, guestCount}
 * @returns {object} - { success, message, smsSent, error (if any) }
 */
const sendReservationSMS = async (phoneNumber, reservation) => {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('[Reservation SMS] Processing SMS for reservation');
    console.log('='.repeat(60));

    // Validate inputs
    if (!phoneNumber || !reservation) {
      console.error('[Reservation SMS] Missing required parameters');
      return {
        success: false,
        message: 'Missing reservation or phone number',
        smsSent: false,
        error: 'Invalid input',
      };
    }

    console.log(`[Reservation SMS] Original Phone: ${phoneNumber}`);

    // Format phone number
    const formattedPhone = formatPhoneNumber(phoneNumber);
    if (!formattedPhone) {
      console.error(`[Reservation SMS] Phone number formatting failed: ${phoneNumber}`);
      return {
        success: false,
        message: 'Invalid phone number format',
        smsSent: false,
        error: 'Phone must be a 10-digit Indian mobile number',
      };
    }

    console.log(`[Reservation SMS] Formatted Phone: ${formattedPhone}`);

    // Format date
    const dateObj = new Date(reservation.reservationDate);
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    // Build SMS message
    const smsMessage = `Smart Table Restaurant

Hello ${reservation.customerName},

Your reservation has been confirmed.

Date: ${formattedDate}
Time: ${reservation.reservationTime}
Guests: ${reservation.guestCount}

Thank you for choosing Smart Table Restaurant.
We look forward to serving you.`;

    console.log(`[Reservation SMS] Message constructed (${smsMessage.length} chars)`);
    console.log(`[Reservation SMS] Message Preview:\n${smsMessage.substring(0, 100)}...`);

    // Send SMS
    const smsResult = await sendViaFast2SMS(formattedPhone, smsMessage);

    console.log('\n' + '='.repeat(60));
    console.log('[Reservation SMS] Result Summary');
    console.log('='.repeat(60));
    console.log(`[Reservation SMS] SMS Sent: ${smsResult.smsSent}`);
    console.log(`[Reservation SMS] Message: ${smsResult.message}`);
    if (smsResult.error) {
      console.log(`[Reservation SMS] Error Details: ${smsResult.error}`);
    }
    console.log('='.repeat(60) + '\n');

    return smsResult;

  } catch (error) {
    console.error('[Reservation SMS] Unexpected error:', error.message);
    console.error('[Reservation SMS] Stack:', error.stack);

    return {
      success: false,
      message: 'Unexpected error sending SMS',
      smsSent: false,
      error: error.message,
    };
  }
};

module.exports = {
  sendReservationSMS,
  formatPhoneNumber,
};
