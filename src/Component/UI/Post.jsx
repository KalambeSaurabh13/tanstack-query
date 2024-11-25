import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchPost, IndividualPost } from "../../Api/api";
import { NavLink, useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["Post"],
    queryFn: ()=>IndividualPost(id),
  });
  return (
    <div>
        {console.log(data,'dt')}
      {data?.id}
      <br />
      {data?.title}
      <br />
      {data?.body}
      <div>hello {id}</div>
      <NavLink to={'/'}>Home</NavLink>
    </div>
  );
};

export default Post;
