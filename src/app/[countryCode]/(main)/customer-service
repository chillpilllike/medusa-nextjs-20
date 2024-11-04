import { Heading, Text } from "@medusajs/ui";
import React from "react";
import { Metadata } from "next";
import Script from "next/script"; // Import the Script component from Next.js

import InteractiveLink from "@modules/common/components/interactive-link";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Contact our staff for more information or help with orders.",
};

const ContactUs = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

      {/* Introduction Section */}
      <div className="mb-4 bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700">
          We&apos;re here to help! If you have any questions or concerns, please
          feel free to reach out to us.
        </p>
      </div>

      {/* Email Section */}
      <div className="mb-4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Email</h2>
        <p className="text-gray-700">
          You can email us at{" "}
          <a
            href="mailto:support@secretgreen.com.au"
            className="text-blue-500 underline"
          >
            support@secretgreen.com.au
          </a>
        </p>
      </div>

      {/* Live Chat Section */}
      <div className="mb-4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Live Chat</h2>
        <p className="text-gray-700">
          Click on the chat icon in the bottom right corner to start a live chat
          with one of our customer service representatives.
        </p>
      </div>

      {/* Reamaze Script for Loader */}
      <Script
        type="text/javascript"
        async
        src="https://cdn.reamaze.com/assets/reamaze-loader.js"
      />

      {/* Reamaze Script for Contact Custom Fields */}
      <Script
        id="reamaze-custom-fields"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            var _support = _support || { 'ui': {}, 'user': {} };
            _support['account'] = 'secretgreen2';
            _support['contact_custom_fields'] = _support['contact_custom_fields'] || {};
            _support['contact_custom_fields']['rmz_form_id_85294'] = {
              'Select Options': {
                pos: 1729408345127,
                type: 'dropdown',
                value: ['Sales','Delivery','Return','Other'],
                required: true,
                placeholder: '',
                defaultValue: 'undefined',
              },
              '__order_number': {
                pos: 1729408345128,
                type: 'order_number',
                required: false,
                placeholder: 'Order Number if available',
                dependantField: 'Select Options',
                dependantOptions: ['Delivery','Return'],
              },
              'Phone': {
                pos: 1729408477729,
                type: 'phone',
                value: '',
                required: true,
                placeholder: 'Phone number required for delivery issues',
                connectContact: false,
                dependantField: 'Select Options',
                dependantOptions: ['Delivery'],
              }
            };
          `,
        }}
      />

      {/* Reamaze Contact Form Embed */}
      <div
        data-reamaze-embed="contact"
        data-reamaze-embed-form-id="85294"
      ></div>
    </div>
  );
};

export default ContactUs;
