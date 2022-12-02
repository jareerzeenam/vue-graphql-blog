import gql from 'graphql-tag';

const BLOGS_LIST = gql`
  query jareer_getAllBlogs(
    $paginate: jareer_PaginationInput
    $sort: jareer_SortInput
  ) {
    jareer_getAllBlogs(paginate: $paginate, sort: $sort) {
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
