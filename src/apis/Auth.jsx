export async function submitData(userData, endpoint) {
  try {
      const response = await fetch(endpoint, {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify(userData)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
          success: true,
          data: result
      };

  } catch (error) {
      console.log(error);
      return {
          success: false,
          error: error.message || 'Failed to submit signup'
      };
  }
}