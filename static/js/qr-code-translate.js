document.addEventListener('DOMContentLoaded', function() {
  const qrCodeContainer = document.getElementById('footer-qrcodes');
  
  if (qrCodeContainer) {
    // Get the current language from html tag
    const currentLang = document.documentElement.lang;
    
    // Prepare labels based on language
    const xiaohongshuLabel = currentLang === 'zh-Hans' ? '小红书' : 'Xiaohongshu';
    const wechatLabel = currentLang === 'zh-Hans' ? '微信' : 'WeChat';
    
    // Create QR code HTML
    qrCodeContainer.innerHTML = `
      <div class="footer__qrcode-container">
        <div class="footer__qrcode-item">
          <img src="/img/qrcode/femtech-weekend-xiaohongshu-qrcode.png" alt="Xiaohongshu QR Code" />
          <span>${xiaohongshuLabel}</span>
        </div>
        <div class="footer__qrcode-item">
          <img src="/img/qrcode/femtech-weekend-gongzhonghao-qrcode.jpg" alt="WeChat Official Account QR Code" />
          <span>${wechatLabel}</span>
        </div>
      </div>
    `;
  }
}); 