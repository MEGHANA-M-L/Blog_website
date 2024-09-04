document.addEventListener('DOMContentLoaded', function () {
    const createPostBtn = document.getElementById('createPostBtn');
    const createPostModal = document.getElementById('createPostModal');
    const closeModal = document.getElementById('closeModal');
    const postForm = document.getElementById('postForm');
    const postSubmitBtn = document.getElementById('postSubmitBtn');
    const postContainer = document.querySelector('.post-container');
    const postDetailModal = document.getElementById('postDetailModal');
    const closeDetailModal = document.getElementById('closeDetailModal');
    const detailTitle = document.getElementById('detailTitle');
    const detailDate = document.getElementById('detailDate');
    const detailDescription = document.getElementById('detailDescription');
    const postCreatedMessage = document.getElementById('postCreatedMessage');
    
    // Zoomed Image Elements
    const zoomedImageContainer = document.createElement('div');
    zoomedImageContainer.className = 'zoomed-image hidden';
    document.body.appendChild(zoomedImageContainer);

    const zoomedImage = document.createElement('img');
    zoomedImageContainer.appendChild(zoomedImage);

    createPostBtn.addEventListener('click', function () {
        createPostModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function () {
        createPostModal.classList.add('fadeOut');
        setTimeout(() => {
            createPostModal.style.display = 'none';
            createPostModal.classList.remove('fadeOut');
        }, 500);
    });

    postForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const postCategory = document.getElementById('postCategory').value;
        const postTitle = document.getElementById('postTitle').value;
        const postDescription = document.getElementById('postDescription').value;
        const postImage = document.getElementById('postImage').files[0]; // Get the uploaded file

        if (postCategory.trim() === '' || postTitle.trim() === '' || postDescription.trim() === '') {
            alert('Please fill out all required fields.');
            return;
        }

        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.toLocaleString('default', { month: 'short' });
        const year = currentDate.getFullYear();
        const formattedDate = day + ' ' + month + ' ' + year;

        const newPost = document.createElement('div');
        newPost.className = 'post-box';

        // Create image HTML if image is uploaded
        const imageHTML = postImage ? `<img src="${URL.createObjectURL(postImage)}" alt="Post Image" class="post-image"/>` : '';

        newPost.innerHTML = `
            ${imageHTML}
            <h1 class="post-title" data-title="${postTitle}" data-date="${formattedDate}" data-description="${postDescription}">
                ${postTitle}
            </h1><br>
            <h2 class="category">${postCategory}</h2><br>
            <span class="post-date">${formattedDate}</span>
            <p class="post-description">${postDescription.substring(0, 100)}...</p>
            <button class="edit-post" data-title="${postTitle}" data-category="${postCategory}" data-description="${postDescription}">Edit</button>
            <button class="delete-post" data-title="${postTitle}">Delete</button>
            <span class="load-more" data-title="${postTitle}" data-date="${formattedDate}" data-description="${postDescription}">Load more</span>
        `;

        postContainer.insertBefore(newPost, postContainer.firstChild);

        postCreatedMessage.style.display = 'block';

        createPostModal.style.display = 'none';
        postForm.reset();

        setTimeout(() => {
            postCreatedMessage.style.display = 'none';
        }, 3000);
    });

    postContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('load-more') || event.target.classList.contains('post-title')) {
            const title = event.target.getAttribute('data-title');
            const date = event.target.getAttribute('data-date');
            const description = event.target.getAttribute('data-description');

            detailTitle.textContent = title;
            detailDate.textContent = date;
            detailDescription.textContent = description;

            postDetailModal.style.display = 'flex';
        }

        if (event.target.classList.contains('delete-post')) {
            const titleToDelete = event.target.getAttribute('data-title');
            const postToDelete = document.querySelector(`.post-title[data-title="${titleToDelete}"]`).closest('.post-box');

            postToDelete.classList.add('fadeOut');

            setTimeout(() => {
                postContainer.removeChild(postToDelete);
            }, 500);
        }

        if (event.target.classList.contains('edit-post')) {
            const title = event.target.getAttribute('data-title');
            const category = event.target.getAttribute('data-category');
            const description = event.target.getAttribute('data-description');

            document.getElementById('postTitle').value = title;
            document.getElementById('postCategory').value = category;
            document.getElementById('postDescription').value = description;

            createPostModal.style.display = 'flex';

            document.querySelector(`.post-title[data-title="${title}"]`).closest('.post-box').remove();
        }

        if (event.target.classList.contains('post-image')) {
            zoomedImage.src = event.target.src;
            zoomedImageContainer.classList.remove('hidden');
        }
    });

    zoomedImageContainer.addEventListener('click', function () {
        zoomedImageContainer.classList.add('hidden');
    });

    closeDetailModal.addEventListener('click', function () {
        postDetailModal.classList.add('fadeOut');
        setTimeout(() => {
            postDetailModal.style.display = 'none';
            postDetailModal.classList.remove('fadeOut');
        }, 500);
    });
});
