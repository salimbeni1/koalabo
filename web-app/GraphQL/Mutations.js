import { gql } from "@apollo/client";

export const NEW_COURSE = gql`
  mutation
    AddNewCourse($className: String, $course: CourseI) {
        addNewCourse(className: $className , course: $course)
    }
  
`;

export const DEL_COURSE = gql`
  mutation
  DelCourse($className: String, $courseID: String) {
        delCourse(className: $className , courseID: $courseID)
    }
`;


export const UPDATE_COURSE = gql`
  mutation
  UpdateCourse( $className: String , $courseID: String , $course: CourseI) {
        updateCourse( className: $className , courseID: $courseID , course: $course)
    }
`;