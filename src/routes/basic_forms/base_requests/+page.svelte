<form action="?/createBaseRequest" method="POST">
  
  <label>
    Requester ID:
    <input name="requester_id" type="number" required />
  </label>

  <label>
    Instructor ID:
    <input name="instructor_id" type="number" required />
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
    Affiliation (office/company):
    <input name="affiliation" type="text" required />
  </label>

  <label>
    Max Approval Layer:
    <input name="max_approval_layer" type="number" required />
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