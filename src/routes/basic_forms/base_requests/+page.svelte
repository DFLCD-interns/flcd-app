<form action="?/createBaseRequest" method="POST">
  <label>
    Faculty-in-Charge ID:
    <input name="faculty_id" type="number" required />
  </label>

  <label>
    Staff Assistant ID:
    <input name="staff_assistant_id" type="number" required />
  </label>  

  <label>
    Purpose:
    <input name="purpose" type="text" required />
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
  
  <label>
    Completion Timestamp:
    <input name="completion_time" type="datetime-local" required />
  </label>

  <button type="submit" class="button-style">Create Base Request</button>
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