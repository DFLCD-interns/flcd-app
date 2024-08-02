# Child Observation Request
<form action="?/createChildRequest" method="POST">
  <label>
    Observation Time:
    <input name="observation_time" type="text" placeholder="" />
  </label>

  <label>
    Child ID:
    <input name="child_id" type="number" />
  </label>
  
  <label>
    Base Request ID:
    <input name="request_id" type="number" required />
  </label>

  <button type="submit" class="button-style">Create Child Observation Request</button>
</form>

# Preferred Times (in Child Observation)
<form action="?/createPreferredTimeChild" method="POST">
  <label>
    Start Time:
    <input name="start_time" type="datetime-local" required />
  </label>

  <label>
    End Time:
    <input name="end_time" type="datetime-local" required />
  </label>

  <label>
    Child Request ID:
    <input name="request_id" type="number" required />
  </label>

  <button type="submit" class="button-style">Choose this Preferred Time (Child)</button>
</form>

# Class Observation Request
<form action="?/createClassRequest" method="POST">
  <label>
    Class ID:
    <input name="class_id" type="number" required />
  </label>
  
  <label>
    Base Request ID:
    <input name="request_id" type="number" required />
  </label>

  <button type="submit" class="button-style">Create Class Observation Request</button>
</form>

# Preferred Times (in Class Observation)
<form action="?/createPreferredTimeClass" method="POST">
  <label>
    Start Time:
    <input name="start_time" type="datetime-local" required />
  </label>

  <label>
    End Time:
    <input name="end_time" type="datetime-local" required />
  </label>

  <label>
    Class Request ID:
    <input name="request_id" type="number" required />
  </label>

  <button type="submit" class="button-style">Choose this Preferred Time (Class)</button>
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