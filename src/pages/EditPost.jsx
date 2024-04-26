import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../client";

const EditPost = () => {
    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", content: "", image_url: "", upvotes: 0, secret_key: ""});

    useEffect(() => {
        const grabCurrentInfo = async (event) => {
            event.preventDefault();
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
            }
        };
        grabCurrentInfo();
    }, [id]);

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from("Posts")
            .update({title: post.title, content: post.content, image_url: post.image_url, secret_key: post.secret_key})
            .eq("id", id);
        window.location = "/gallery";
    };

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
            .from("Posts")
            .delete()
            .eq("id", id);
        window.location = "/gallery";
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <div className="edit-post">
            <h1>Update Post</h1>
            <form>
                <label>Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} placeholder="Title" onChange={handleChange} /> <br />
                <br />

                <label>Content (Optional)</label> <br />
                <textarea rows="8" type="text" id="content" name="content" value={post.content} placeholder="Content (Optional)" onChange={handleChange} /> <br />
                <br />

                <label>Image URL (Optional)</label> <br />
                <input type="text" id="image-url" name="image_url" value={post.image_url} placeholder="Image URL (Optional)" onChange={handleChange} /> <br />
                <br />

                <label>Secret Key (Optional)</label> <br />
                <input type="text" id="secret-key" name="secret_key" value={post.secret_key} placeholder="Secret Key (Optional)" onChange={handleChange} /> <br />
                <br />
                
                <input className="update-button" type="submit" value="Update Post" onClick={updatePost} />
                <input className="delete-button" type="submit" value="Delete Delete" onClick={deletePost} />
            </form>
        </div>
    );
};

export default EditPost;