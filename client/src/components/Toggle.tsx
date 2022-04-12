import React, { useState } from "react";

const Toggle: React.FC<{ label?: string; children?: React.ReactNode }> = ({
  label,
  children,
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow((s) => !s)}>{`${show ? "Hide" : "Show"}${
        label && " " + label
      }`}</button>
      {show && children}
    </>
  );
};

export default Toggle;
