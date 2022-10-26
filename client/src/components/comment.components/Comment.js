const Comment = ({commentData}) => {
    return ( 
    <>
    
    {commentData.map((props) => (
        <div key={props.id} className="card">
            <h1>{props.profile_id}</h1>
            <p>{props.comment_text}</p>
        </div>
    ))}

    </> );
}
 
export default Comment;