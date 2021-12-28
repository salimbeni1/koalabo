import { gql } from "@apollo/client";

export const SCI1FRS = gql`
  query {
    sci1frs{
      title
      bg
      links{
        link
        name
      }
    }
  }
`;