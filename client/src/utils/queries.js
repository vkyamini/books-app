import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query Query($meId: ID!) {
    me(id: $meId) {
      _id
      bookCount
      email
      savedBooks {
        _id
        authors
        bookId
        description
        image
        link
        title
      }
      username
    }
  }
`;
