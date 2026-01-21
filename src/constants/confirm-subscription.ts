import { translate } from '@docusaurus/Translate';

// Confirmation page text
export const getConfirmationTitle = () => translate({
  id: 'confirmation.title',
  message: 'Confirm Subscription',
});

export const getConfirmationDescription = () => translate({
  id: 'confirmation.description',
  message: 'Confirm your FemTech Weekend newsletter subscription',
});

export const getConfirmationSuccessTitle = () => translate({
  id: 'confirmation.success.title',
  message: 'Subscription Confirmed!',
});

export const getConfirmationSuccessMessage = () => translate({
  id: 'confirmation.success.message',
  message: 'You have been successfully subscribed to the FemTech Weekend newsletter. Check your inbox for a welcome email!',
});

export const getConfirmationErrorTitle = () => translate({
  id: 'confirmation.error.title',
  message: 'Confirmation Failed',
});

export const getConfirmationErrorMessage = () => translate({
  id: 'confirmation.error.message',
  message: 'The confirmation link is invalid or has expired. Please try subscribing again.',
});

export const getConfirmationLoadingMessage = () => translate({
  id: 'confirmation.loading',
  message: 'Confirming your subscription...',
});

export const getConfirmationBackToHome = () => translate({
  id: 'confirmation.backToHome',
  message: 'Back to Homepage',
});
