import React from "react";

const HelpComponent = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-xl font-nunito tracking-normal">
      <h1 className="text-2xl font-bold mb-6">Help Center</h1>

      {/* Report a Bug Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-primary">
          Report a Bug
        </h2>
        <p className="text-gray-600 mb-4">
          If you encounter any issues or bugs on our platform, please let us
          know. Your feedback is valuable in improving the user experience.
        </p>
        {/* Add a form or contact information for bug reporting */}
      </div>

      <div class="rounded-lg">
        <div class="text-2xl font-semibold mb-4 flex items-center">
          <span class="mr-2">📧</span>
          Need Assistance? Reach Out to Us!
        </div>
        <div class="text-gray-700">
          <p class="mb-4">
            For any questions, concerns, or assistance you require, our
            dedicated support team is here to help. Feel free to get in touch
            with us via email:
          </p>
          <div class="flex items-center mb-4">
            <span class="text-xl mr-2">📧</span>
            <span class="font-semibold">support@connectio.in</span>
          </div>
          <p class="mb-4">
            Our team is committed to providing prompt and helpful responses to
            ensure you have the best experience possible. Whether you need help
            with account issues, technical difficulties, or general inquiries,
            don't hesitate to reach out.
          </p>
          <p class="mb-4">
            Additionally, you can explore our comprehensive FAQ section for
            quick answers to common queries:{" "}
            <a href="#" class="text-primaryunderline">
              FAQs
            </a>
          </p>
          <p>
            Thank you for choosing Connectio! We look forward to assisting you.
          </p>
        </div>
        <div class="mt-4">
          <span class="bg-primary text-white py-1 px-3 rounded mr-2">
            #CustomerSupport
          </span>
          <span class="bg-primary text-white py-1 px-3 rounded mr-2">
            #EmailSupport
          </span>
          <span class="bg-primary text-white py-1 px-3 rounded">#WeCare</span>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-primary mt-3">
          FAQs
        </h2>
        <ul className="list-disc list-inside text-gray-600 font-semibold">
          <li>How can I update my profile information?</li>
          <li>How do I delete my account?</li>
          <li>How can I change my password?</li>
          {/* Add more questions and answers as needed */}
        </ul>
      </div>
    </div>
  );
};

export default HelpComponent;
