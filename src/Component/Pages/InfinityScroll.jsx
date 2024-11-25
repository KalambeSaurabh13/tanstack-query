import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { infinityUser } from "../../Api/api";
import { useInView } from "react-intersection-observer";

const InfinityScroll = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["scroll"],
      queryFn: infinityUser,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
    });

//   const handleScroll = () => {
//     const bottom =
//       window.innerHeight + window.scrollY >=
//       document.documentElement.scrollHeight - 1;
//     if (bottom && hasNextPage) {
//       fetchNextPage();
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [hasNextPage]);

const { ref, inView } = useInView({
    threshold:1
});

useEffect(() => {
if(inView && hasNextPage) {
    fetchNextPage();
}
},[hasNextPage, inView, fetchNextPage]);

  return (
    <div>
      InfinityScroll
      <div>
        {data?.pages?.map((page, index) => {
          return (
            <div>
              {page.map((user, index) => (
                <figure
                  key={index}
                  class="bg-slate-100 rounded-xl p-8 dark:bg-slate-800"
                >
                  <img
                    class="w-24 h-24 rounded-full mx-auto"
                    src={user.avatar_url}
                    alt=""
                    width="384"
                    height="512"
                  />
                  <div class="pt-6 text-center space-y-4">
                    <figcaption class="font-medium">
                      <div class="text-sky-500 dark:text-sky-400">
                        {user.login}
                      </div>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          );
        })}

        <div ref={ref}>
        {isFetchingNextPage && <div>Loading.... </div>}
        </div>
      </div>
    </div>
  );
};

export default InfinityScroll;
