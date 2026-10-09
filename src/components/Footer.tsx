import React from "react";

const Footer = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 px-4 md:px-6 py-4 md:py-0 md:h-17.25 bg-base-200 text-center md:text-left">
      <div>
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
      </div>

      <div>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </div>
  );
};

export default Footer;
