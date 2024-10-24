const handleApiError = (error: any) => {
  if (error.response) {
    console.error(
      `HEY DEV: Error ${error.response.status}: ${error.response.data.message}`
    );
  } else if (error.request) {
    console.error("HEY DEV: No response received from the server.");
  } else {
    console.error("HEY DEV: An unknown error occurred: ", error.message);
  }
};
