import { CREATE_POST_ACTION } from "../actions/PostActions";

const initialState = {
    posts: [
        {
            id: 1,
            title: 'Post Title 1',
            description: 'Sample Description 1'
        },
        {
            id: 2,
            title: 'Post Title 2',
            description: 'Sample Description 2'
        },
        {
            id: 3,
            title: 'Post Title 3',
            description: 'Sample Description 3'
        }
    ]
}

export default function PostsReducer(state= initialState , actions){
    if(actions.type === CREATE_POST_ACTION)
    {
        const post = 
            {
                id: Math.random(),
                title: 'Post Title 4',
                description: 'Sample Description 4 dag'
            };

            const posts = [...state.posts]
            
            posts.push(post);
            return {
                ...state,
                posts
            };
    }
    return state;
}