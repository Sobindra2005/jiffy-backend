


const sendOtp = async (phoneNumber) => {
    try {
      const response = await client.twoFA.sendPin({
        applicationId: 'your_application_id',
        messageId: 'your_message_template_id',
        from: 'your_sender_id',
        to: phoneNumber,
      });
      console.log('OTP sent successfully:', response);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
  
  const verifyOtp = async (applicationId, pin) => {
    try {
      const response = await client.twoFA.verifyPin(applicationId, pin);
      console.log('OTP verified successfully:', response);
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };