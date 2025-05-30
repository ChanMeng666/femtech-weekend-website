import { JoinFormState } from './useJoinFormState';

export async function submitEcosystemForm(formState: JoinFormState) {
  let finalFormData = {...formState};
  
  try {
    // If we have a logo image (Base64 format), upload to Cloudinary first
    if (formState.logo && typeof formState.logo === 'string' && formState.logo.startsWith('data:image')) {
      try {
        // Upload image to Cloudinary
        const imageResponse = await fetch('/api/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: formState.logo }),
        });
        
        const imageResult = await imageResponse.json();
        
        if (imageResult.success) {
          // Replace Base64 with returned URL
          finalFormData.logo = imageResult.url;
        } else {
          console.error('Image upload failed:', imageResult.message);
          // Continue submission but without image
          finalFormData.logo = null;
        }
      } catch (imageError) {
        console.error('Image upload error:', imageError);
        // Continue submission but without image
        finalFormData.logo = null;
      }
    }
    
    // Send form data to Notion API endpoint
    const response = await fetch('/api/submit-ecosystem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalFormData),
    });
    
    const result = await response.json();
    
    return {
      success: result.success,
      message: result.message || 'Form submitted successfully'
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      message: 'Submission failed, please try again later'
    };
  }
} 