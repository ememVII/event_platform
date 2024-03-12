"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const [userQuery, setUserQuery] = useState("");

  const router = useRouter();
  const pathName = usePathname();
  // Search Params is read only so we can't modify it directly, we need to make a copy first
  const searchParams = useSearchParams();

  // const handleQueryChange = (value: string) => {
  //   const query = new URLSearchParams(searchParams.toString());
  //   query.set("query", value);

  //   router.push(`${pathName}?${query}`, { scroll: false });
  // };

  const handleQueryChange = (queryValue: string) => {
    setUserQuery(queryValue);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (userQuery) {
        // .toString() because it URL so we need to convert it to string
        const query = new URLSearchParams(searchParams.toString());
        query.set("query", userQuery);

        router.push(`${pathName}?${query}`, { scroll: false });
      } else {
        router.push(`${pathName}`, { scroll: false });
      }

      return () => clearTimeout(delayDebounceFn);
    }, 300);
  }, [userQuery, pathName, router]);

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
      />

      <Input
        type="text"
        placeholder="Search..."
        className="p-medium-16 ml-5 w-full border-none bg-grey-50 tracking-wide focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(e) => handleQueryChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
