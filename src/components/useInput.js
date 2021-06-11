import { useEffect, useState } from "react";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    console.log(value);
  }, [value]);
  return {
    value,
    setValue,
    bind: {
      value,
      onChange: (e) => {
        setValue((prev) => {
          prev[goal.goal]
            ? e.target.value !== ""
              ? (prev[goal.goal][item] = e.target.value)
              : delete prev[goal.goal][item]
            : (prev[goal.goal] = { [item]: e.target.value });

          return prev;
        });
      },
    },
  };
};
