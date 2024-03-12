"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const router = useRouter();
  const pathName = usePathname();
  // Search Params is read only so we can't modify it directly, we need to make a copy first
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

  //   useEffect(() => {
  //     const delayDebounceFn = setTimeout(() => {
  //       if (category) {
  //         // .toString() because it URL so we need to convert it to string
  //         const query = new URLSearchParams(searchParams.toString());
  //         query.set("query", category);

  //         router.push(`${pathName}?${query}`, { scroll: false });
  //       } else {
  //         router.push(`${pathName}`, { scroll: false });
  //       }

  //       return () => clearTimeout(delayDebounceFn);
  //     }, 300);
  //   }, [category, pathName, router]);

  const onSelectCategory = (category: string) => {
    if (category && category !== "All") {
      // .toString() because it URL so we need to convert it to string
      const categoryParam = new URLSearchParams(searchParams.toString());

      categoryParam.set("category", category);

      router.push(`${pathName}?${categoryParam}`, { scroll: false });
    } else {
      router.push(`${pathName}`, { scroll: false });
    }
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field w-[180px]">
        <SelectValue placeholder="Catgory" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="p-regular-16 cursor-pointer">
          All
        </SelectItem>

        {categories.map((category) => (
          <SelectItem
            value={category.name}
            key={category._id}
            className="select-item p-regular-16 cursor-pointer"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
