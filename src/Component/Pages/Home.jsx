import React, { useState } from "react";
import { DeletePost, fetchPost, UpdatePost } from "../../Api/api";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

const Home = () => {
    const queryClient = useQueryClient()
    const [pageNumber, setPageNumber] = useState(0)
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["posts",pageNumber],
    queryFn:()=> fetchPost(pageNumber),
    // staleTime: 10000,
    // refetchInterval:2000,
    // refetchIntervalInBackground:true,
    placeholderData:keepPreviousData
  });

  const deleteMutation =  useMutation({
    mutationFn:(id)=>DeletePost(id),
    onSuccess:(data,id) =>{
        queryClient.setQueryData(['posts',pageNumber],
            (currElement) =>{
                return currElement?.filter((post)=>post.id!==id);
            }
        )
    }
  })

  const updateMutation =  useMutation({
    mutationFn:(id)=>UpdatePost(id),
    onSuccess:(apiData,id) =>{
        queryClient.setQueryData(['posts',pageNumber],
            (currElement) =>{
                return currElement?.map((post)=>{
                    return (post.id==id?{...post, title:apiData.data.title}: post)
                });
            }
        )
    }
  })
  if (isError) return <p>{error.message}</p>;
  if (isPending) return <p>{"loading...."}</p>;

  return (
    <div className="relative  text-left">
      <div className=" py-1  flex justify-center z-10 mt-2 w-75 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className=" border-4 my-4 shadow-2xl  " role="none">
          {data?.map((post, index) => (
            <div key={post.id}>
            <NavLink to={`/post/${post.id}`}>
            <div className="block px-4 py-2 text-sm text-gray-700" key={index}>
                {post.id}
              {post.title}
            </div>
            </NavLink>
              <button onClick={()=>deleteMutation.mutate(post.id)}>Delete</button>
              <button onClick={()=>updateMutation.mutate(post.id)}>Update</button>

            
            </div>
          ))}
        </div>

        <button  onClick={()=>setPageNumber(prev=> prev - 3)}>Previous</button>
         {(pageNumber/3 +1 )}
        <button onClick={()=>setPageNumber(prev=>prev + 3)}>Next</button>
      </div>
    </div>
  );    
};

export default Home;
