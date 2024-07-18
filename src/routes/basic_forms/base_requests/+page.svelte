<script>
  let data;
  let form; 

  async function handleSubmit(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/createBaseRequest', {
        method: 'POST',
        body: formData
      });

      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('Base request created successfully!');
      }
      else {
        alert('Failed to create base request.');
      }
    } catch (error) {
      console.error('Error creating base request:', error);
      alert('Failed to create base request.');
    }
  }
</script>
  
<form on:submit|preventDefault={handleSubmit}>
  <label>
    Request Timestamp:
    <input name="request_time" type="datetime-local" required />
  </label>

  <label>
    Completion Timestamp:
    <input name="completion_time" type="datetime-local" required />
  </label>

  <label>
    Faculty-in-Charge ID:
    <input name="faculty_id" type="number" required />
  </label>
  
  <label>
    Office:
    <input name="office" type="text" required />
  </label>

  <label>
    Company:
    <input name="company" type="text" required />
  </label>

  <label>
    Admin Approval Layer:
    <input name="admin_approve_layer" type="number" required />
  </label>

  <label>
    Requester ID:
    <input name="requester_id" type="number" required />
  </label>

  <button type="submit">Create Base Request</button>
</form>