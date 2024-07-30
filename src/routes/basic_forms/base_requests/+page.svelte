<form action="?/createBaseRequest" method="POST">
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