document.addEventListener('DOMContentLoaded', () => {
    const signBtn = document.getElementById('signBtn');
    const signaturePad = document.getElementById('signaturePad');
    const clearBtn = document.getElementById('clearBtn');
    const saveBtn = document.getElementById('saveBtn');
    const signaturePreview = document.getElementById('signaturePreview');
    const base64Output = document.getElementById('base64Output');
    const copyBtn = document.getElementById('copyBtn');
    const ctx = signaturePad.getContext('2d');
    let isDrawing = false;

    const defaultImage = 'default-image.png'; // Varsayılan resmin yolu

    $('#signatureModal').on('shown.bs.modal', () => {
        ctx.clearRect(0, 0, signaturePad.width, signaturePad.height);
        signaturePreview.src = defaultImage;
        base64Output.textContent = '';
    });

    signaturePad.addEventListener('mousedown', () => {
        isDrawing = true;
        ctx.beginPath();
    });

    signaturePad.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
        }
    });

    signaturePad.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    signaturePad.addEventListener('mouseout', () => {
        isDrawing = false;
    });

    clearBtn.onclick = () => {
        ctx.clearRect(0, 0, signaturePad.width, signaturePad.height);
        signaturePreview.src = defaultImage;
        base64Output.textContent = '';
    };

    saveBtn.onclick = () => {
        const dataURL = signaturePad.toDataURL();
        signaturePreview.src = dataURL;
        base64Output.textContent = dataURL;
        // Cut off at 10 lines and add ellipsis
        const lines = dataURL.split('\n');
        if (lines.length > 10) {
            base64Output.textContent = lines.slice(0, 10).join('\n') + '\n...';
        }
    };

    copyBtn.onclick = () => {
        const text = base64Output.textContent.replace(/\n...\s*$/, '');
        navigator.clipboard.writeText(text).then(() => {
            alert('İmza kopyalandı!');
        }).catch((err) => {
            console.error('Kopyalama başarısız:', err);
        });
    };

    // Initialize with default image if no signature is present
    if (!signaturePreview.src) {
        signaturePreview.src = defaultImage;
    }
});
