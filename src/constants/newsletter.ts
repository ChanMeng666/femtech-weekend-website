import {translate} from '@docusaurus/Translate';

// Newsletter form text
export const getNewsletterPlaceholder = () => translate({
  id: 'newsletter.placeholder',
  message: 'Enter your email address',
});

export const getNewsletterButtonText = () => translate({
  id: 'newsletter.button',
  message: 'Subscribe',
});

export const getNewsletterLoadingText = () => translate({
  id: 'newsletter.loading',
  message: 'Subscribing...',
});

export const getNewsletterSuccessMessage = () => translate({
  id: 'newsletter.success',
  message: 'Please check your email and click the confirmation link to complete your subscription.',
});

export const getNewsletterErrorMessage = () => translate({
  id: 'newsletter.error',
  message: 'An error occurred. Please try again.',
});

export const getNewsletterInvalidEmailMessage = () => translate({
  id: 'newsletter.invalidEmail',
  message: 'Please enter a valid email address',
});

export const getNewsletterAlreadySubscribedMessage = () => translate({
  id: 'newsletter.alreadySubscribed',
  message: 'This email is already subscribed.',
});

// Newsletter CTA Section text
export const getNewsletterCTALabel = () => translate({
  id: 'newsletter.cta.label',
  message: 'Stay Updated',
});

export const getNewsletterCTATitle = () => translate({
  id: 'newsletter.cta.title',
  message: 'Join Our Newsletter',
});

export const getNewsletterCTADescription = () => translate({
  id: 'newsletter.cta.description',
  message: 'Get the latest FemTech insights, research reports, and community updates delivered to your inbox.',
});
