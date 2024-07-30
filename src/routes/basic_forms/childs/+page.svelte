<form action="?/createChild" method="POST">
  <label>
    Child Name:
    <input name="name" type="text" placeholder="Prinz Zedric" required />
  </label>

  <label>
    Birthdate:
    <input name="birthdate" type="date" />
  </label>

  <label>
    Tracking ID:
    <input name="tracking_id" type="text" placeholder="(from the Excel Database)" required />
  </label>

  <label>
    Class ID:
    <input name="class_id" type="number" placeholder="12" />
  </label>

  <button type="submit" class="button-style">Register Child</button>
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