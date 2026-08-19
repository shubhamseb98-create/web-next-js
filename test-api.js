const fd = new FormData();
fd.append('title', 'Test');
fd.append('features', '["Lightning-fast load times"]');

async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/services/static-website-development', {
      method: 'PUT',
      body: fd
    });
    console.log("Status:", res.status);
    console.log("Response:", await res.json());
  } catch(e) {
    console.error(e);
  }
}
test();
