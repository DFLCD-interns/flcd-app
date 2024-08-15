# Class Observation Request
<form action="?/createClassRequest" method="POST">
  <label>
    Class ID:
    <input name="class_id" type="number" required />
  </label>
  
  <label>
    Formatted Timeslot:
    <input name="timeslot" type="number" required />
  </label>
  <label>

    Observe Date:
    <input name="observe_date" type="date" required />
  </label>

  <label>
    Base Request ID:
    <input name="request_id" type="number" required />
  </label>
  
  <label>
    Assigned Child ID:
    <input name="assigned_child_id" type="number" required />
  </label>

  <button type="submit" class="button-style">Create Class Observation Request</button>
</form>

<form action="?/createObservationRequest" method="POST">
  <label>
    Observation Request
    <input name="observation_request" type="text" />
  </label>

  <button type="submit">Create Observation Request</button>
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