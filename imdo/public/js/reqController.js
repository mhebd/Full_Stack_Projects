async function updateLike(postId, userId) {
  fetch(`/image/like/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
    }),
  });
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

async function logout() {
  const res = await fetch('/logout', {
    method: 'post',
  });
  const data = res.json();
  window.location.reload();
}
