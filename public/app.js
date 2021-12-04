const form = document.getElementById('form');

const testAccessibility = async (e) => {
  e.preventDefault();

  const url = document.getElementById('url-input').value;

  if (url === '') alert('Please enter url');
  else {
    setLoading();
    const res = await fetch(`/api/test?url=${url}`);

    if (res.status !== 200) {
      setLoading(false);
      alert('Something Went Wrong!!');
    } else {
      const { results } = await res.json();
      updateIssues(results.issues);
      setLoading(false);
    }
  }
};

const updateIssues = (issues) => {
  const issuesDOM = document.getElementById('issues');
  issuesDOM.innerHTML = '';

  if (issues.length === 0) issuesDOM.innerHTML = `<h4>No issues found</h4>`;
  else {
    issues.forEach((issue) => {
      const issueDOM = `
            <div class="card mb-5">
                <div class="card-body">
                    <h4>${issue.message}</h4>
                    <p class="bg-light my-3 p-3">
                        ${escapeHTML(issue.context)}
                    </p>
                    <p class="bg-secondary text-light p-2">CODE: ${
                      issue.code
                    }</p>
                </div>
            </div>
          `;
      issuesDOM.innerHTML += issueDOM;
    });
  }
};

function escapeHTML(html) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const setLoading = (isLoading = true) => {
  const loader = document.querySelector('.loader');

  if (isLoading) loader.style.display = 'block';
  else loader.style.display = 'none';
};

form.addEventListener('submit', testAccessibility);
