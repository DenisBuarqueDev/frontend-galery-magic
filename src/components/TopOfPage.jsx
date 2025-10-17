import React from "react";

const TopOfPage = ({ title, subtitle }) => {
  return (
    <section className="p-2 mx-auto text-center mb-6 max-w-screen-sm w-full">
      <h1 className="text-5xl px-8 bg-gradient-to-r from-yellow-700 to-amber-500 text-transparent bg-clip-text font-extrabold tracking-tight">
        {title}
      </h1>
      <p className="flex items-center justify-center m-auto rounded-full w-[250px] mt-4 text-lg font-normal bg-amber-500 text-white py-1 px-3">
        {subtitle}
      </p>
    </section>
  );
};

export default TopOfPage;
