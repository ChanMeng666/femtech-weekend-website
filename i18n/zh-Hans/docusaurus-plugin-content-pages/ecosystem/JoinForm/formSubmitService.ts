import { JoinFormState } from './useJoinFormState';

// 确定API服务器URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' // 生产环境
  : 'http://localhost:3001/api'; // 开发环境或构建后本地测试

export async function submitEcosystemForm(formState: JoinFormState) {
  let finalFormData = {...formState};
  
  try {
    // If we have a logo image (Base64 format), upload to Cloudinary first
    if (formState.logo && typeof formState.logo === 'string' && formState.logo.startsWith('data:image')) {
      try {
        // Upload image to Cloudinary
        const imageResponse = await fetch(`${API_BASE_URL}/upload-image`, {
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
    const response = await fetch(`${API_BASE_URL}/submit-ecosystem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalFormData),
    });
    
    const result = await response.json();
    
    return {
      success: result.success,
      message: result.message || '表单提交成功'
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      message: '提交失败，请稍后再试'
    };
  }
} 