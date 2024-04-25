import { useEffect, useState } from "react";
import { supabase } from "../../client";
import Post from "../components/Post";

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Read all posts from the database table
        const fetchPosts = async () => {
            const {data} = await supabase
                .from("Posts")
                .select()
                .order("created_at", {ascending: true});
            setPosts(data);
        }
        fetchPosts();
    }, []);

    return (
        <div className="read-posts">
            <h1 className="read-posts-title">Forum Posts</h1>
            <div className="read-posts-gallery">
                {
                    posts && posts.length > 0 ?
                    posts.map((post, index) =>
                        <Post key={index} id={post.id} title={post.title} content={post.content} imageURL={post.image_url} upvotes={post.upvotes} secretKey={post.secret_key} createdAt={post.created_at} />
                    ) : <h2>{'No Posts Yet 😞'}</h2>
                }
            </div>
        </div>
    );
};

export default ReadPosts;