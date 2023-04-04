import gql from "graphql-tag";

const SHOW_BLOG = gql`
query Jareer_showBlog($jareerShowBlogId: String!) {
  jareer_showBlog(id: $jareerShowBlogId) {
    id
    title
    description
    author
    categoryId
    createdAt
  }
}
`;

export { SHOW_BLOG };
