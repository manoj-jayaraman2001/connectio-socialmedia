const DisplayMessage = ({ message, setMessage }) => {
  return (
    <div
      id="message"
      class="fixed top-0 right-0 m-4 w-64 p-4 bg-white shadow-md rounded-md"
    >
      <div class="flex justify-between items-center">
        <p>{message}</p>
        <button
          id="closeMessage"
          class="text-gray-500 hover:text-gray-700"
          onClick={() => {
            setMessage(null);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div class="w-full h-1 mt-2 bg-gray-200 rounded"></div>
    </div>
  );
};

export default DisplayMessage;
