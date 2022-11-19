import gql from 'graphql-tag';

const offset = 1;
const limit = 20;

const order = 'DESC';

const BLOGS_LIST = gql`
  query {
    jareer_getAllBlogs(paginate: { offset: ${offset}, limit: ${limit} } sort: { fieldName: "createdAt", order: ${order} }) {
      data {
        id
        title
        description
        author
        categoryId
        createdAt
      }
      total
      offset
      limit
    }
  }
`;

export { BLOGS_LIST };
