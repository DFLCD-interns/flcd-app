<script>
  let data;
  let form; 

  async function handleSubmit(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/createApprovalForm', {
        method: 'POST',
        body: formData
      });

      const body = await response.json();
      const success = body.data.includes('true');

      if (success) {
        alert('Approval form created successfully!');
      }
      else {
        alert('Failed to create approval form.');
      }
    } catch (error) {
      console.error('Error creating approval form:', error);
      alert('Failed to create approval form.');
    }
  }
</script>
  
<form on:submit|preventDefault={handleSubmit}>
  <label>
    Status:
    <input name="status" type="text" required />
  </label>

  <label>
    Remarks:
    <input name="remarks" type="text" />
  </label>

  <label>
    Approver ID:
    <input name="approver_id" type="number" required />
  </label>
  
  <label>
    Staff Assisted ID:
    <input name="staff_assistant_id" type="number" required />
  </label>

  <label>
    Base Request ID:
    <input name="request_id" type="number" required />
  </label>

  <button type="submit" class="button-style">Create Approval Form</button>
</form>

<style>
  .button-style {
    border-radius: 20px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>