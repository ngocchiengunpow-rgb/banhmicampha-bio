document.addEventListener('DOMContentLoaded', () => {
    // Cascade animation for link cards
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.5s ease-out forwards ${0.3 + index * 0.1}s`;
    });

    // Copy to clipboard functionality setup
    const copyBtn = document.getElementById('copy-btn');
    const accountNumber = document.getElementById('account-number').innerText;

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(accountNumber);
            
            // Show tooltip
            copyBtn.classList.add('copied');
            
            // Change icon temporarily to check-circle
            const icon = copyBtn.querySelector('i');
            const originalIconClass = icon.className;
            icon.className = 'ph ph-check-circle';
            
            // Hide tooltip after 2 seconds
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                icon.className = originalIconClass;
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = accountNumber;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Fallback copy failed', err);
            }
            document.body.removeChild(textArea);
        }
    });

    // QR Modal functionality
    const qrBtn = document.getElementById('qr-btn');
    const qrModal = document.getElementById('qr-modal');
    const closeModal = document.getElementById('close-modal');

    // Show modal
    qrBtn.addEventListener('click', () => {
        qrModal.classList.add('active');
    });

    // Hide modal on close button click
    closeModal.addEventListener('click', () => {
        qrModal.classList.remove('active');
    });

    // Hide modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === qrModal) {
            qrModal.classList.remove('active');
        }
    });

    // Copy email functionality
    const emailLink = document.getElementById('email-link');
    emailLink.addEventListener('click', async (e) => {
        e.preventDefault(); // Prevent jump to #
        const emailText = "ngocchien5170@gmail.com";
        try {
            await navigator.clipboard.writeText(emailText);
            const spanText = emailLink.querySelector('.link-text');
            const originalText = spanText.innerText;
            spanText.innerText = 'Đã chép Email!';
            setTimeout(() => {
                spanText.innerText = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy email: ', err);
        }
    });

    // Share section functionality
    const shareUrl = "https://tinyurl.com/banhmicampha";
    
    // Copy Share Link
    const shareCopyBtn = document.getElementById('share-copy-btn');
    shareCopyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            const icon = shareCopyBtn.querySelector('i');
            const originalIconClass = icon.className;
            icon.className = 'ph ph-check-circle';
            setTimeout(() => {
                icon.className = originalIconClass;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy share link: ', err);
        }
    });

    // Native Share API
    const shareNativeBtn = document.getElementById('share-native-btn');
    shareNativeBtn.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Bánh Mì Cẩm Phả',
                    text: 'Ghé thăm trang Web tiện ích và mạng xã hội của Bánh Mì Cẩm Phả nhé!',
                    url: shareUrl
                });
            } catch (err) {
                console.error('Lỗi chia sẻ: ', err);
            }
        } else {
            alert("Trình duyệt của bạn không hỗ trợ tính năng chia sẻ. Hãy dùng nút Copy Link nhé!");
        }
    });

    // Share QR Modal
    const shareQrBtn = document.getElementById('share-qr-btn');
    const shareQrModal = document.getElementById('share-qr-modal');
    const closeShareModal = document.getElementById('close-share-modal');

    shareQrBtn.addEventListener('click', () => {
        shareQrModal.classList.add('active');
    });

    closeShareModal.addEventListener('click', () => {
        shareQrModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === shareQrModal) {
            shareQrModal.classList.remove('active');
        }
    });
});
