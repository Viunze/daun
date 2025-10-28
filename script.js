class LeafAnimation {
    constructor() {
        this.container = document.getElementById('leavesContainer');
        this.leafImages = [
            'https://files.catbox.moe/gqonev.png',
            'https://files.catbox.moe/2x4ex7.jpg',
            'https://files.catbox.moe/vr8b3m.jpg',
            'https://files.catbox.moe/kaaasq.png'
        ];
        
        this.leafSettings = [
            { type: 1, size: { min: 40, max: 80 }, duration: { min: 14, max: 18 }, delay: 0 },
            { type: 2, size: { min: 50, max: 90 }, duration: { min: 16, max: 20 }, delay: 2 },
            { type: 3, size: { min: 45, max: 85 }, duration: { min: 15, max: 19 }, delay: 1 },
            { type: 1, size: { min: 35, max: 70 }, duration: { min: 13, max: 17 }, delay: 3 }
        ];

        this.isRunning = true;
        this.init();
    }

    init() {
        // Spawn daun secara berkelanjutan
        this.spawnContinuously();
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            this.isRunning = !document.hidden;
        });
    }

    spawnContinuously() {
        if (!this.isRunning) {
            requestAnimationFrame(() => this.spawnContinuously());
            return;
        }

        const randomSetting = this.leafSettings[Math.floor(Math.random() * this.leafSettings.length)];
        this.createLeaf(randomSetting);

        // Spawn interval yang natural (2-4 detik)
        const spawnDelay = Math.random() * 2000 + 2000;
        setTimeout(() => this.spawnContinuously(), spawnDelay);
    }

    createLeaf(settings) {
        const leaf = document.createElement('div');
        leaf.className = `leaf leaf-${settings.type}`;
        
        // Random size
        const size = Math.random() * (settings.size.max - settings.size.min) + settings.size.min;
        leaf.style.width = size + 'px';
        leaf.style.height = size + 'px';

        // Random X position
        const startX = Math.random() * window.innerWidth;
        leaf.style.left = startX + 'px';
        leaf.style.top = '-100px';

        // Random image daun
        const imageIndex = Math.floor(Math.random() * this.leafImages.length);
        leaf.style.backgroundImage = `url('${this.leafImages[imageIndex]}')`;

        // Random opacity (untuk variasi)
        const opacity = Math.random() * 0.3 + 0.7;
        leaf.style.opacity = opacity;

        // Random duration
        const duration = Math.random() * (settings.duration.max - settings.duration.min) + settings.duration.min;
        leaf.style.animationDuration = duration + 's';
        leaf.style.animationDelay = settings.delay + 's';

        // Random horizontal drift
        const drift = Math.random() * 200 - 100;
        const horizontalWave = this.getWaveAnimation(drift, duration);
        leaf.style.setProperty('--drift-x', drift + 'px');

        this.container.appendChild(leaf);

        // Hapus leaf setelah animasi selesai
        setTimeout(() => {
            leaf.remove();
        }, (duration + settings.delay) * 1000);
    }

    getWaveAnimation(drift, duration) {
        // Menambahkan wave effect yang natural
        return `translateX(${drift}px)`;
    }
}

// Tambahan: Animasi wave dengan JavaScript untuk efek yang lebih smooth
class WaveController {
    constructor(leaf, drift, duration) {
        this.leaf = leaf;
        this.drift = drift;
        this.duration = duration;
        this.startTime = Date.now();
        this.animate();
    }

    animate() {
        const elapsed = Date.now() - this.startTime;
        const progress = (elapsed / (this.duration * 1000)) % 1;

        // Sine wave untuk horizontal movement
        const waveX = Math.sin(progress * Math.PI * 4) * 30;
        const offsetX = this.drift * progress;

        // Smooth easing untuk vertical movement (akan di-override oleh CSS)
        if (this.leaf.parentElement) {
            this.leaf.style.transform = `translateX(${offsetX + waveX}px)`;
            requestAnimationFrame(() => this.animate());
        }
    }
}

// Enhanced CSS dengan wave effect
const addWaveEffects = () => {
    const style = document.createElement('style');
    style.textContent = `
        .leaf {
            will-change: transform, opacity;
            backface-visibility: hidden;
            perspective: 1000px;
        }

        .leaf:nth-child(odd) {
            animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .leaf:nth-child(even) {
            animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        }

        @keyframes fallRotate1 {
            0% {
                transform: translateY(-100px) translateX(0) rotate(0deg) scale(1);
                opacity: 0;
            }
            3% {
                opacity: 1;
            }
            97% {
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) translateX(var(--drift-x, 0px)) rotate(720deg) scale(0.8);
                opacity: 0;
            }
        }

        @keyframes fallRotate2 {
            0% {
                transform: translateY(-100px) translateX(0) rotate(0deg) scale(1);
                opacity: 0;
            }
            3% {
                opacity: 1;
            }
            97% {
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) translateX(calc(var(--drift-x, 0px) * -1)) rotate(-720deg) scale(0.85);
                opacity: 0;
            }
        }

        @keyframes fallRotate3 {
            0% {
                transform: translateY(-100px) translateX(0) rotate(0deg) scale(1);
                opacity: 0;
            }
            3% {
                opacity: 1;
            }
            97% {
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) translateX(var(--drift-x, 0px)) rotate(540deg) scale(0.9);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
};

// Inisialisasi
addWaveEffects();

// Start animasi
window.addEventListener('load', () => {
    new LeafAnimation();
});

// Handle jika JavaScript dijalankan sebelum window.load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LeafAnimation();
    });
} else {
    new LeafAnimation();
}
