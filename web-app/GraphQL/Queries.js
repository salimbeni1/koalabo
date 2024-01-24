import { gql } from "@apollo/client";

export const LIST_COURSE = gql`
  query listCourses($className: String) {
    listCourses (className: $className) {
      index
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
