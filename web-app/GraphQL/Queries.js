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
        _id
      }
    }
  }
`;

export const LIST_COURSE = gql`
  query listCourses($className: String) {
    listCourses (className: $className) {
      title
      bg
      _id
      links{
        link
        name
        _id
      }
    }
  }
`;
