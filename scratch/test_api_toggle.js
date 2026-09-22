const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhN2IwMDZjMzY2ODNmZGQ0ZjJmOWVlNSIsImVtYWlsIjoiYWRtaW5AdGhld2VidHljb29ucy5jb20iLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3OTAwNzAwODgsImV4cCI6MTc5MDY3NDg4OH0.l0qUgngJp4ame4ShgvmNQQfQMOURR_4JV9eZueB5ues';

async function testApiToggle() {
  console.log('Testing PUT /api/technologies/section-status with enabled: false');
  let res = await fetch('http://localhost:3000/api/technologies/section-status', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ enabled: false })
  });
  let json = await res.json();
  console.log('PUT false response:', json);

  console.log('\nTesting GET /api/technologies/section-status');
  res = await fetch('http://localhost:3000/api/technologies/section-status');
  json = await res.json();
  console.log('GET response:', json);

  console.log('\nTesting PUT /api/technologies/section-status with enabled: true');
  res = await fetch('http://localhost:3000/api/technologies/section-status', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ enabled: true })
  });
  json = await res.json();
  console.log('PUT true response:', json);

  res = await fetch('http://localhost:3000/api/technologies/section-status');
  json = await res.json();
  console.log('GET response after reset:', json);
}

testApiToggle().catch(console.error);
