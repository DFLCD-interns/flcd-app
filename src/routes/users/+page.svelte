<script>
    let formData = {
      first_name: '',
      last_name: '',
      email: '',
      pw_hash: '',
      phone: '',
      student_number: '',
      course: '',
      department: '',
      superior_id: '',
      access_level: ''
    };
  
    async function handleSubmit() {
      try {
        const response = await fetch('/test-api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain'
          },
          body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to create user');
        }
  
        alert('User created successfully!');
        // Optionally, redirect or perform another action upon success
      } catch (error) {
        console.error('Error creating user:', error);
        alert('Failed to create user');
      }
    }
  </script>
  
  <form on:submit|preventDefault={handleSubmit}>
    <label>
      First Name:
      <input type="text" bind:value={formData.first_name} required />
    </label>
  
    <label>
      Last Name:
      <input type="text" bind:value={formData.last_name} required />
    </label>
  
    <label>
      Email:
      <input type="email" bind:value={formData.email} required />
    </label>
  
    <label>
      Password Hash:
      <input type="password" bind:value={formData.pw_hash} required />
    </label>
  
    <label>
      Phone:
      <input type="text" bind:value={formData.phone} />
    </label>
  
    <label>
      Student Number:
      <input type="text" bind:value={formData.student_number} />
    </label>
  
    <label>
      Course:
      <input type="text" bind:value={formData.course} />
    </label>
  
    <label>
      Department:
      <input type="text" bind:value={formData.department} />
    </label>
  
    <label>
      Superior ID:
      <input type="number" bind:value={formData.superior_id} />
    </label>
  
    <label>
      Access Level:
      <input type="number" bind:value={formData.access_level} />
    </label>
  
    <button type="submit">Create User</button>
  </form>
  