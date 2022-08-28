import { gql } from "@apollo/client";

export const SCI1FRS = gql`
  query {
    sci1frs{
      title
      state
      bg
      _id
      links{
        state
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
      state
      title
      bg
      _id
      links{
        state
        link
        name
        _id
      }
    }
  }
`;
