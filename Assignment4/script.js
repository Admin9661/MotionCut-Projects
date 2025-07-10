document.addEventListener('DOMContentLoaded', () => {
    const timeBlocks = document.querySelectorAll('.time-block');
    
    const resetBtn = document.getElementById('reset-btn');

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset the planner? This will clear all saved tasks and priorities.')) {
                localStorage.clear();
                location.reload();
            }
        });
    }
    timeBlocks.forEach(timeBlock => {
        const hour = timeBlock.dataset.hour;
        const taskInput = timeBlock.querySelector('.task-input');
        const prioritySelect = timeBlock.querySelector('.priority-select');
        const completeCheckbox = timeBlock.querySelector('input[type="checkbox"]');
        const saveBtn = timeBlock.querySelector('.save-btn');

        saveBtn.addEventListener('click', () => {
            localStorage.setItem(`task-${hour}`, taskInput.value);
            localStorage.setItem(`priority-${hour}`, prioritySelect.value);
        });

        completeCheckbox.addEventListener('change', () => {
            taskInput.classList.toggle('completed', completeCheckbox.checked);
            localStorage.setItem(`completed-${hour}`, completeCheckbox.checked);
        });

        prioritySelect.addEventListener('change', () => {
            updateTaskColor(timeBlock, prioritySelect.value);
            localStorage.setItem(`priority-${hour}`, prioritySelect.value);
        });

        const savedTask = localStorage.getItem(`task-${hour}`);
        if (savedTask) {
            taskInput.value = savedTask;
        }

        const savedPriority = localStorage.getItem(`priority-${hour}`);
        if (savedPriority) {
            prioritySelect.value = savedPriority;
            updateTaskColor(timeBlock, savedPriority);
        }

        const savedCompleted = localStorage.getItem(`completed-${hour}`);
        if (savedCompleted === 'true') {
            completeCheckbox.checked = true;
            taskInput.classList.add('completed');
        }
    });
});

function updateTaskColor(timeBlock, priority) {
    const taskInput = timeBlock.querySelector('.task-input');
    taskInput.style.backgroundColor = 'transparent';
    switch (priority) {
        case 'high':
            taskInput.style.backgroundColor = '#ffdddd';
            break;
        case 'medium':
            taskInput.style.backgroundColor = '#fffadd';
            break;
        case 'low':
            taskInput.style.backgroundColor = '#ddffdd';
            break;
    }
}
