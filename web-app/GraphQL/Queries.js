import { gql } from "@apollo/client";

export const SCI1FRS = gql`
  query {
    sci1frs{
      title
      bg
      _id
      links{
        link
        name
      }
    }
  }
`;