import { uploadPoster, insertEventProposal } from '/services/event-form-client.js'
// Image preview + drag & drop
const posterUpload = document.getElementById('posterUpload');
const posterPreview = document.getElementById('posterPreview');
const uploadPrompt = document.getElementById('uploadPrompt');
const uploadZone = document.getElementById('uploadZone');

function showPreview(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        posterPreview.src = ev.target.result;
        posterPreview.onload = () => recalculateDrawer();
        posterPreview.classList.remove('hidden');
        uploadPrompt.classList.add('hidden');
        recalculateDrawer();
    };
    reader.readAsDataURL(file);
}

posterUpload.addEventListener('change', (e) => showPreview(e.target.files[0]));

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    showPreview(e.dataTransfer.files[0]);
});

//dropdown
const toggleForm = document.getElementById('toggleForm');
const formDrawer = document.getElementById('formDrawer');
const toggleArrow = document.getElementById('toggleArrow');
function recalculateDrawer() {
    const formDrawer = document.getElementById('formDrawer');
    const isOpen = formDrawer.style.maxHeight && formDrawer.style.maxHeight !== '0px';
    if (isOpen) {
        formDrawer.style.maxHeight = formDrawer.scrollHeight + 'px';
    }
}

toggleForm.addEventListener('click', () => {
    const isOpen = formDrawer.style.maxHeight && formDrawer.style.maxHeight !== '0px';

    if (isOpen) {
        formDrawer.style.maxHeight = '0px';
        toggleArrow.classList.remove('rotate-180');
    } else {
        formDrawer.style.maxHeight = formDrawer.scrollHeight + 'px';
        toggleArrow.classList.add('rotate-180');
    }
});

// Form submit
const form = document.getElementById('eventForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    showToast('loading', 'Loading...')
    try {
        const file = form.posterUpload.files[0];
        const payload = {
            event_name: form.eventTitle.value,
            host_name: form.organizer.value,
            contact_email: form.email.value,
            event_date: form.eventDate.value,
            event_time: form.eventTime.value,
            location: form.location.value,
            description: form.description.value,
            poster_url: file ? await uploadPoster(form.posterUpload.files[0]) : null
        }

        await insertEventProposal(payload);
        showToast('success', 'Event proposal submitted! We\'ll review it ASAP.');
        form.reset();
        posterPreview.classList.add('hidden');
        uploadPrompt.classList.remove('hidden');
    } catch (err) {
        showToast('error', err.message || 'Something went wrong. Please try again.')
        throw err;
    }
    


});

function showToast(type, message) {
    const toast = document.getElementById('toast');
    const icon = document.getElementById('toastIcon');
    const msg = document.getElementById('toastMessage');

    // Set content
    msg.textContent = message;

    // Set style based on type
    const styles = {
        success: {
            icon: '💜',
            classes: 'bg-purple-400 text-white'
        },
        error: {
            icon: '❌',
            classes: 'bg-red-500 text-white'
        },
        loading: {
            icon: '⏳',
            classes: 'bg-zinc-800 text-white'
        }
    };

    const { icon: ic, classes } = styles[type];
    icon.textContent = ic;

    // Reset classes and apply new ones
    toast.className = `fixed bottom-6 right-6 z-50 max-w-sm px-5 py-4 rounded-xl shadow-2xl text-sm font-medium transition-all duration-300 opacity-0 translate-y-4 ${classes}`;

    // Trigger animation in
    toast.classList.remove('hidden');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.classList.remove('opacity-0', 'translate-y-4');
            toast.classList.add('opacity-100', 'translate-y-0');
        });
    });

    // Auto dismiss after 4s (skip for loading)
    if (type !== 'loading') {
        setTimeout(() => dismissToast(), 4000);
    }
}

function dismissToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => toast.classList.add('hidden'), 300);
}