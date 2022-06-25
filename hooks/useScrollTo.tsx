import React from "react";

const useScrollTo = <T extends Element>(): [
  React.RefObject<T>,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const ref = React.useRef<T>(null);
  const [shouldScrollTo, setShouldScrollTo] = React.useState(false);

  React.useEffect(() => {
    if (ref.current && shouldScrollTo) {
      ref.current!.scrollIntoView({ behavior: "smooth" });
      setShouldScrollTo(false);
    }
  }, [shouldScrollTo]);

  return [ref, setShouldScrollTo];
};

export default useScrollTo;
