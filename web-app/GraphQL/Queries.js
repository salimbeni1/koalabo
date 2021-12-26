import { gql } from "@apollo/client";

export const SCI1FRS = gql`
  query {
    sci1frs{
      title
      links{
        link
      }
    }
  }
`;