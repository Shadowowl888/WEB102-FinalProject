import { useEffect, useState } from "react";
import { supabase } from "../../client";
import Post from "../components/Post";

const ReadPosts = ({ searchQuery }) => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        // Read all posts from the database table
        const fetchPosts = async () => {
            let query = supabase
                .from("Posts")
                .select();
            if (sortBy === "newest") {
                query.order("created_at", {ascending: false});
            } else if (sortBy === "popular") {
                query.order("upvotes", {ascending: false})
            }
            const { data } = await query
            setPosts(data);
        }
        fetchPosts();
    }, [sortBy]);
    
    // Filter posts based on search query
    const filteredPosts = searchQuery ? posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase())) : posts;

    return (
        <div className="read-posts">
            <h1 className="read-posts-title">Forum Posts</h1>
            <div className="sort-buttons">
                <button className={`sort-button ${sortBy === "newest" ? "active" : ""}`} onClick={() => setSortBy("newest")}>Newest</button>
                <button className={`sort-button ${sortBy === "popular" ? "active" : ""}`} onClick={() => setSortBy("popular")}>Most Popular</button>
            </div>
            <div className="read-posts-gallery">
                {
                    filteredPosts && filteredPosts.length > 0 ?
                    filteredPosts.map((post, index) =>
                        <Post key={index} id={post.id} title={post.title} content={post.content} imageURL={post.image_url} upvotes={post.upvotes} secretKey={post.secret_key} createdAt={post.created_at} />
                    ) : <h2>{'No Posts Yet 😞'}</h2>
                }
            </div>
        </div>
    );
};

export default ReadPosts;