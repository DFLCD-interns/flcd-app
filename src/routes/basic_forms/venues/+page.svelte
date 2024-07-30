<form action="?/createVenue" method="POST">
  <label>
    Venue Name:
    <input name="name" type="text" placeholder="Room 104" required />
  </label>

  <label>
    Description:
    <input name="description" type="text" placeholder="1st floor, 4th room leftwards" />
  </label>

  <button type="submit" class="button-style">Create Venue</button>
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