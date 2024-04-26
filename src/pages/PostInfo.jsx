import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../client";

const PostInfo = () => {
    const {id} = useParams();
    const [post, setPost] = useState([]);
    const [upvotes, setUpvotes] = useState(0);
    const [timePosted, setTimePosted] = useState("");

    useEffect(() => {
        // Read all posts from the database table
        const grabCurrentInfo = async () => {
            const {data, error} = await supabase
                .from("Posts")
                .select()
                .eq("id", id)
                .single();
            if (error) {
                throw error;
            }
            if (data) {
                setPost(data);
                setUpvotes(data.upvotes);
                getTimeDifference(new Date(data.created_at));
            }
        };
        grabCurrentInfo();
        
        const getTimeDifference = (createdAt) => {
            const currentTime = new Date();
            const postedTime = new Date(createdAt);
            const difference = currentTime - postedTime;
            const seconds = Math.floor(difference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const weeks = Math.floor(days / 7);
            
            if (weeks > 0) {
                setTimePosted(`Posted ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`);
            } else if (days > 0) {
                setTimePosted(`Posted ${days} ${days === 1 ? "day" : "days"} ago`);
            } else if (hours > 0) {
                setTimePosted(`Posted ${hours} ${hours === 1 ? "hour" : "hours"} ago`);
            } else if (minutes > 0) {
                setTimePosted(`Posted ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`);
            } else {
                setTimePosted("Posted just now");
            }
        };
    }, [id, post.created_at]);

    const upvote = async (event) => {
        setUpvotes(upvotes + 1);
        event.preventDefault();
        await supabase
            .from("Posts")
            .update({upvotes: upvotes + 1})
            .eq("id", post.id);
        window.location = `/info/${id}`;
    };
    
    if (post.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-info">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <h5>{post.upvotes} upvotes</h5>
            <img className="post-info-img" src={post.image_url} />
            <p>{timePosted}</p>
            <Link to={`/edit/${post.id}`}><button className="post-link-button">Edit Post</button></Link>
            <button className="upvote-button" type="submit" onClick={upvote}>Upvote 👍</button>
        </div>
    );
};

export default PostInfo;